const Router = require('express');
const router = new Router();
const transactionController = require('../Controllers/TransactionController')

router.get('/', transactionController.getTransaction);
router.post('/create',transactionController.createTransaction)
router.put('/update', transactionController.updateTransaction)

module.exports = router;