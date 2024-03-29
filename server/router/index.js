require("dotenv").config();
const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const pizzaController = require("../controllers/pizza-controller");
const cartController = require("../controllers/cart-controller");
const validations = require("../validations/validations");
const cloudinaryController = require("../controllers/cloudinary-controller");
const passport = require("passport");
const checkAuth = require("./checkAuth")


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
router.put("/update", userController.update);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get('/me', checkAuth.check, userController.getMe);
///////////////cart//////////////
router.post("/order", cartController.order);
// router.get("/userCart/:id", cartController.userCart);
///////////////pizza/////////////
router.get("/pizzas", pizzaController.getPizzas);
// router.get("/page", pizzaController.getPage);
router.get("/pizzas/:id", pizzaController.categoryPizzas);
router.post("/pizza", validations.create, pizzaController.createPizza);
///////////////sort/////////////
router.get("/sort/:value", pizzaController.sort);
router.get("/search/:value", pizzaController.search);
///////////////cloudinary/////////////
router.delete("/avatar/:id", cloudinaryController.delete)


module.exports = router;
