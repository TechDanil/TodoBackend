import { Request, Response } from 'express';
import { getSupervisors } from '../utils/getSupervisors/getSupervisors';

class UserController {
    async getSupervisors(req: Request, res: Response) {
        try {
            const supervisors = await getSupervisors();
            return res.status(200).json({ supervisors });
        } catch (error) {
            console.error('Error in getSupervisorsWithoutSupervisees:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new UserController();
