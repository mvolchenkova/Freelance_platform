const Router = require('express');
const router = new Router();
const supportController = require('../Controllers/Customer/SupportController');

router.get('/',supportController.getSupport)
router.post('/create/:id',supportController.createSupport)
router.put('/update/:id', supportController.updateSupport)
module.exports = router;