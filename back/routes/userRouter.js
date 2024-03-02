const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/registration',  userController.registration)
router.post('/login', userController.login)
router.post('/updateProfilePhoto', userController.updateProfilePhoto)

module.exports = router
