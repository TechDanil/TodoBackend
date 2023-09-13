import { User } from '../../models/User';

const getSupervisors = async (): Promise<User[]> => {
    try {
        const supervisors = await User.query()
            .whereNull('supervisor_id');
        return supervisors;
    } catch (error) {
        console.error('Error getting supervisors without supervisees:', error);
        throw error;
    }
}

export { getSupervisors };
