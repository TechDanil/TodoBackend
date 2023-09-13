import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { User as UserModel } from '../models/User';
import { mapStatus } from '../utils/mapStatus/mapStatus';
import { mapPriority } from '../utils/mapPriority/mapPriority';

declare global {
    namespace Express {
        interface User extends UserModel {
            id: number;
        }
    }
}

class TaskController {
    createTask = async (req: Request, res: Response) => {
        try {
            const { title, description, end_date, responsible_id, status, priority } = req.body;

            if (!responsible_id || isNaN(Number(responsible_id))) {
                return res.status(400).json({ message: 'Invalid responsible_id' });
            }

            const responsibleUser = await UserModel.query().findById(Number(responsible_id));

            if (!responsibleUser) {
                return res.status(400).json({ message: 'Responsible user not found' });
            }

            const mappedPriority = mapPriority(priority);
            const mappedStatus = mapStatus(status);

            const task = await Task.query().insert({
                title,
                description,
                end_date,
                priority: mappedPriority,
                status: mappedStatus,
                creator_id: req.user?.id,
                responsible_id: Number(responsible_id),
            });

            console.log(status)
            console.log(priority)


            return res.status(201).json({ message: 'Task created successfully', task });
        } catch (error) {
            console.error('Error in createTask:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    getAllTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.query();

            return res.status(200).json({ tasks });
        } catch (error) {
            console.error('Error in getAllTasks:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    getCompletedTasks = async (req: Request, res: Response) => {
        try {
            const completedTasks = await Task.query().where('status', 'completed');
            return res.status(200).json({ tasks: completedTasks });
        } catch (error) {
            console.error('Error in getCompletedTasks:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    getTasksGroupedByResponsible = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.query().select('responsible_id').distinct();

            const groupedTasks: Record<number, any[]> = {};

            for (const task of tasks) {
                const responsibleId = task.responsible_id;
                console.log(responsibleId)
                const responsibleTasks = await Task.query().where('responsible_id', responsibleId);
                console.log(responsibleTasks)
                groupedTasks[responsibleId] = responsibleTasks;
            }

            return res.status(200).json({ groupedTasks });
        } catch (error) {
            console.error('Error in getTasksGroupedByResponsible:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
 
    updateTaskById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, end_date, priority, responsible_id, status } = req.body;

        try {
            const task = await Task.query().findById(id);

            console.log(task);

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            await Task.query().findById(id).patch({
                title,
                description,
                end_date,
                priority,
                responsible_id,
                status,
            });

            const updatedTask = await Task.query().findById(id);

            return res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
        } catch (error) {
            console.error('Error in updateTaskById:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new TaskController();