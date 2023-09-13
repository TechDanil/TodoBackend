import { Model } from 'objection';
import { Task } from './Task';
import bcrypt from 'bcrypt';

class User extends Model {
    static tableName = 'users';

    id!: number;
    name!: string;
    last_name!: string;
    patronymic!: string;
    login!: string;
    password!: string;
    supervisor_id!: number;
    created_at!: Date;
    updated_at!: Date;

    static jsonSchema = {
        type: 'object',
        required: ['name', 'last_name', 'login', 'password'],
        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 1, maxLength: 255 },
            last_name: { type: 'string', minLength: 1, maxLength: 255 },
            patronymic: { type: ['string', 'null'], maxLength: 255 },
            login: { type: 'string', minLength: 1, maxLength: 255 },
            password: { type: 'string', minLength: 1, maxLength: 255 },
            supervisor_id: { type: ['integer', 'null'] },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
        },
    };

    static relationMappings = {
        tasks: {
            relation: Model.HasManyRelation,
            modelClass: Task,
            join: {
                from: 'users.id',
                to: 'tasks.responsible_id',
            }
        },

        supervisors: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'users.supervisor_id',
                to: 'users.id',
            },
        },
    };
}

export { User };