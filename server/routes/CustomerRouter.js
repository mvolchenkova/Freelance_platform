const Router = require('express');
const router = new Router();
const userController = require('../Controllers/Customer/CustomerController')
const {body} = require('express-validator')

router.get('/',userController.getUsers);
router.get('/registerUser',userController.getById);
router.put('/updateUser/:id', userController.updateUser);
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:5, max:30}),
    body('login').isLength({min:5, max:20}),
    userController.registration);
router.put('/blockUser/:id',userController.blockUser);
router.post('/login',userController.logining)
router.post('/logout',userController.logout)
router.get('/refresh',userController.refresh)
router.get('/:id', userController.getById)

module.exports = router;