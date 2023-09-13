import { Model } from 'objection';
import { User } from './User';
import { PriorityType } from '../enums/PriorityType';
import { StatusType } from '../enums/StatusType';

class Task extends Model {
    static tableName = 'tasks';

    id!: number;
    title!: string;
    description!: string;
    end_date!: Date;
    dateOfCreation!: Date;
    updateDate!: Date;
    priority!: PriorityType;
    status!: StatusType;
    creator_id!: number;
    responsible_id!: number;

    static jsonSchema = {
        type: 'object',
        required: [
            'title',
            'description',
            'end_date',
            'priority',
            'status',
            'responsible_id',
        ],
        properties: {
            id: { type: 'integer' },
            title: { type: 'string', minLength: 1, maxLength: 255 },
            description: { type: 'string', maxLength: 1000 },
            end_date: { type: 'string', format: 'date-time' },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
            priority: { type: 'string', enum: ['High', 'Medium', 'Low'] },
            status: {
                type: 'string',
                enum: ['to be executed', 'in progress', 'completed', 'canceled'],
            },
            creator_id: { type: 'integer' },
            responsible_id: { type: 'integer' },
        },
    };

    static relationMappings = {
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'tasks.creator_id',
                to: 'users.id',
            },
        },
        responsible: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'tasks.responsible_id',
                to: 'users.id',
            },
        },
    };
}

export { Task };
