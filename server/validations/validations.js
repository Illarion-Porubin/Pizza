import { body } from "express-validator";

export const loginValidation = [
    body('name', 'Длинна должна быть больше 4 символов').isString().isLength({ min: 4 }),
    body('email', 'Длинна должна быть больше 4 символов').isEmail(),
    body('password', 'Длинна должна быть больше 4 символов').isString(),
    body('admin', "true или fasle").isBoolean().optional()
];

export const registValidation = [
    body('name', 'Длинна должна быть больше 4 символов').isString().isLength({ min: 4 }),
    body('email', 'Длинна должна быть больше 4 символов').isEmail(),
    body('password', 'Длинна должна быть больше 4 символов').isString(),
    body('admin', "true или fasle").isBoolean().optional()
];

export const pizzaValidation = [
    body(`imageUrl`, `Длинна должна быть больше 4 символов`).isString().isURL,
    body(`name`, `Длинна должна быть больше 4 символов, имя должно быть уникальным`).isString().isLength({min: 4}),
    body(`types`, `В массиве должны быть строки`).isArray(),
    body(`sizes`,`В массиве должны быть числа`).isArray(),
    body(`price`, `Цена должна быть числом`).isString(),
    body(`category`,`Длинна должна быть больше 4 символов`).isString().isLength({min: 4}),
    body(`rating`,`От 0 до 9`).isString(),
    body(`new`,`true или false`).isBoolean(),
    body(`popular`,`true или false`).isBoolean(),
]