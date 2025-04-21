const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/', userController.create)
router.get('/', userController.getAll)
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router