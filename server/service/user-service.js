const UserSchema = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const { findById } = require("../models/user-model");



///////////////////////////////
class UserService {
  async registration(email, password, name, phone) {
    const candidate = await UserSchema.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

    const user = await UserSchema.create({
      email,
      phone,
      password: hashPassword,
      name,
      activationLink,
    });
    
    /// mailService если письмо не отправляется, то нужно подождать 2-3 дня, ограничение на отправку от гугла
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`
    // ); 

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, ...userDto };
  }
/////////////////////
  async login(email, password) {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    // return { ...tokens, user: userDto }; // токены и userDto;
    const { ...userData } = user._doc;
    return { ...tokens, ...userData };
  }
////////////////////
  async update(data) {
    const { email, name, phone, color, publicId } = data;
    const user = await UserSchema.findOne({email});
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    await user.updateOne({email, name, phone, color, publicId})
  }

  async activate(activationLink) {
    const user = await UserSchema.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async me(req, res) {
    try {
      const user = await UserSchema.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          message: `пользователь не найден`,
        });
      }

      const { passwordHash, ...userData } = user._doc;
      
      return {...userData}
    } catch (err) {
      console.log("Не смог найти пользователя");
      res.status(500).json(err);
    }
  }

///////////////////////////////
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserSchema.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserSchema.find();
    return users;
  }

  
}

module.exports = new UserService();
