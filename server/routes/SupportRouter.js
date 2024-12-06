const Router = require('express');
const router = new Router();
const supportController = require('../Controllers/SupportController');

router.get('/',supportController.getSupport)
router.post('/create/:id',supportController.createSupport)
router.put('/update/:id', supportController.updateSupport)
module.exports = router;