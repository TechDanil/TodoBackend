import { validationResult, check } from 'express-validator';


const validateSignup = [
    check('name').notEmpty().withMessage('Имя обязательно!'),
    check('last_name').notEmpty().withMessage('Фамилия обязательна!'),
    check('patronymic').notEmpty().withMessage('Отчество обязательно'),
    check('login').notEmpty().withMessage('Логин обязателен!'),
    check('login')
      .notEmpty().withMessage('Логин обязателен!')
      .isEmail().withMessage('Неправильный формат емейла!'),
    check('password')
      .isLength({ min: 6 }).withMessage('Пароль должен содержать не менее 6 знаков')
      .matches(/\d/).withMessage('Пароль должен содержать цифру'),
];

const validateLogin = [
    check('login').notEmpty().withMessage('Почта обязательна!'),
    check('password').notEmpty().withMessage('Пароль обязателен!'),
];

export { validateLogin, validateSignup };