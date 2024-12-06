const Router = require('express');
const router = new Router();
const customerController = require('../Controllers/CustomerController')

router.get('/',customerController.getCustomer)
router.post('/create', customerController.createCustomer)
router.get('/:id',customerController.getCustomerById)

module.exports = router;