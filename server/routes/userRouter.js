const Router = require('express')
const router = new Router()
const userController = require('../Controllers/Freelancer/userController')
const userAdminController=require('../Controllers/Admin/UserController')

router.post('/', userController.create)
router.get('/', userController.getAll)
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/:id/services', userController.getUserServices);
router.put('/blockUser/:id',userAdminController.blockUser)

module.exports = router