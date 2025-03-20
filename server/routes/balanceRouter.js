const Router = require('express')
const router = new Router()
const balanceController = require('../controllers/balanceController')

router.post('/', balanceController.create)
router.get('/', balanceController.getAll)
router.put('/:id', balanceController.update);
router.delete('/:id', balanceController.delete);

module.exports = router