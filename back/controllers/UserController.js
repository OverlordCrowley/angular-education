const ApiError = require('../error/ApiError');
const {User} = require('../models/index');


class UserController {
  async registration(req, res, next) {
    const {name, email, password} = req.body
    console.log(req.body)
    if (!email || !password || !name) {
      return next(ApiError.badRequest('Некорректный email или пароль'))
    }

    const candidate = await User.User.findOne({where: {'email' : email}})

    if(candidate){

      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    try{


      const user = await User.User.create({"first_name" : name, "email": email, "pass": password})

      return res.json({user})
    }
    catch (error) {
      next(ApiError.badRequest('Ошибка регистрации'))

    }

  }

  async login(req, res, next) {

    const {email, password} = req.body
    const user = await User.User.findOne({where: {"email":email, "pass": password}})
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }

    return res.json(user)
  }

}

module.exports = new UserController()
