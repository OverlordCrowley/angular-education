const ApiError = require('../error/ApiError');
const {User} = require('../models/index');
const path = require("path");
const {log} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");
const fs = require('fs');
const {uid} = require("uid");
const formidable = require('formidable');

class UserController {
  async registration(req, res, next) {
    const {name, email, password, lastName, hobbies, phone} = req.body
    console.log(req.body)

    const candidate = await User.User.findOne({where: {'email': email}})

    if (candidate) {

      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    try {
      const user = await User.User.create({"firstName": name, "email": email, "pass": password,
      "lastName": lastName, "hobbies": String(hobbies), "phone": phone})
      return res.json({user})
    } catch (error) {
      next(ApiError.badRequest('Ошибка регистрации'))

    }

  }

  async getUsers(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
      const users = await User.User.findAndCountAll({
        offset,
        limit: parseInt(limit),
      });

      if (users.rows.length === 0) {
        return next(ApiError.notFound('Пользователи не найдены'));
      }

      const totalPages = Math.ceil(users.count / parseInt(limit));

      return res.json({
        totalPages,
        currentPage: parseInt(page),
        users: users.rows,
      });
    } catch (error) {
      next(ApiError.internal('Ошибка при получении пользователей'));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.User.findOne({ where: { "email": email, "pass": password } });

      if (!user) {
        return next(ApiError.internal('Пользователь не найден'));
      }


      return res.json({
        user
      });

    } catch (error) {
      return next(ApiError.internal('Ошибка при получении данных пользователя'));
    }
  }
  async updateProfilePhoto(req, res, next) {
    if (!req.files || !req.files.photo) {
      return res.status(400).send('Файл не был загружен');
    }

    const email = req.body.email;
    const photo = req.files.photo;

    try {
      const user = await User.User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).send('Пользователь не найден');
      }

      const uploadDir = path.join(__dirname, '..', 'static');
      const extension = photo.name.split('.').pop();
      const filename = `${uid()}.${extension}`;
      const uploadPath = path.join(uploadDir, filename);

      await photo.mv(uploadPath);

      user.image = `/static/${filename}`;
      await user.save();

      return res.json({
       user
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }





}
module.exports = new UserController();
