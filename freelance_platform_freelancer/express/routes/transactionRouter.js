const Router = require('express')
const router = new Router()
const transactionController = require('../controllers/transactionController')

router.post('/', transactionController.create)
router.get('/', transactionController.getAll)
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

module.exports = router