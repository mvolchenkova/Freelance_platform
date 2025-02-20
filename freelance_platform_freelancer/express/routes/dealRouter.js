const Router = require('express')
const router = new Router()
const dealController = require('../controllers/dealController')

router.post('/', dealController.create)
router.get('/', dealController.getAll)
router.put('/:id', dealController.update);
router.delete('/:id', dealController.delete);

module.exports = router