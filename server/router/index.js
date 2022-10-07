require("dotenv").config();
const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const pizzaController = require("../controllers/pizza-controller");
const validations = require("../validations/validations");
const passport = require("passport");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
///////////////google//////////////
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }), (req, res) =>  {
  console.log(req.user)
});
router.get("/google/callback", passport.authenticate("google", 
  {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);
///////////////auth//////////////
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/register", userController.registration);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get('/auth/me', userController.getMe);
///////////////pizza/////////////
router.get("/pizzas", pizzaController.getPizzas);
router.get("/pizzas/:id", pizzaController.categoryPizzas);
router.post("/pizza", validations.create, pizzaController.createPizza);
///////////////sort/////////////
router.get("/sort/:value", pizzaController.sort);
router.get("/search/:value", pizzaController.search);

module.exports = router;
