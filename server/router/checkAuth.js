const jwt = require("jsonwebtoken");

class checkAuth {
  async check(req, res, next) {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        // console.log(decoded.id, 'decoded');
        req.userId = decoded.id;
        // console.log(req.userId, 'check');
        next(); 
      } catch (error) {
        return res.status(403).json({
          message: "Нет доступа",
        });
      }
    } else {
      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  }
}

module.exports = new checkAuth();
