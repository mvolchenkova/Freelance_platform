const Router = require('express')
const router = new Router()
const categoryController = require('../Controllers/Freelancer/categoryController')

router.post('/', categoryController.create)
router.get('/', categoryController.getAll)
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router