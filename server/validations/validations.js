const { body } = require ("express-validator");


class validations {
    login = [
        // body('name', 'Длинна должна быть больше 4 символов').isString().isLength({ min: 4 }),
        body('email', 'Длинна должна быть больше 4 символов').isEmail(),
        body('password', 'Длинна должна быть больше 4 символов').isString(),
        // body('admin', "true или fasle").isBoolean().optional()
    ];
    
    regist = [
        body('name', 'Длинна должна быть больше 4 символов').isString().isLength({ min: 4 }),
        body('email', 'Длинна должна быть больше 4 символов').isEmail(),
        body('password', 'Длинна должна быть больше 4 символов').isString(),
        body('admin', "true или fasle").isBoolean().optional()
    ];
    
    create = [
        body(`imageUrl`, `Длинна должна быть больше 4 символов`).isString().isURL(),
        body(`name`, `Длинна должна быть больше 4 символов, имя должно быть уникальным`).isString().isLength({min: 4}),
        body(`types`, `В массиве должны быть строки`).isArray(String),
        body(`sizes`, `В массиве должны быть числа`).isArray(Number),
        body(`price`, `Цена должна быть числом`).isString(),
        body(`category`, `Категория должна быть от 1 до 4`).isString().isLength({max: 1}),
        body(`rating`, `От 0 до 9`).isString(),
        body(`new`, `true или false`).isBoolean(),
        body(`popular`, `true или false`).isBoolean(),
    ]
   
}



module.exports = new validations()
