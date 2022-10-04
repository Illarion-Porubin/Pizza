const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const pizzaController = require('../controllers/pizza-controller');
const validations = require ("../validations/validations");


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
///////////////auth//////////////
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/register', userController.registration);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
///////////////pizza/////////////
router.get("/pizzas", pizzaController.getPizzas)
router.get("/pizzas/:id", pizzaController.categoryPizzas)
router.post("/pizza", validations.create, pizzaController.createPizza)
///////////////sort/////////////
router.get("/sort/:value", pizzaController.sort)
router.get("/search/:value", pizzaController.search)



module.exports = router
