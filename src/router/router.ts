import express from 'express';
import AuthController from '../controllers/AuthController';
import passport from 'passport';
import UserController from '../controllers/UserController';
import TaskController from '../controllers/TaskController';
import { validateSignup, validateLogin } from '../utils/setValidation/setValidation';

const router = express.Router();

router.post('/signup', validateSignup, AuthController.signup);

router.post('/login', validateLogin, passport.authenticate('local', { session: false }), AuthController.login);
router.get('/tasks', TaskController.getAllTasks);
router.post('/createTasks', TaskController.createTask);
router.put('/task/:id', TaskController.updateTaskById);

router.get('/supervisors', UserController.getSupervisors);

router.get('/tasks/completed', TaskController.getCompletedTasks);
router.get('/tasks/grouped-by-responsible', TaskController.getTasksGroupedByResponsible);

export default router;