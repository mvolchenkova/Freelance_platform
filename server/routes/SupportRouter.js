const Router = require('express');
const router = new Router();
const supportController = require('../Controllers/Admin/SupportController');

router.get('/',supportController.getAll)
router.post('/',supportController.create)
router.put('/:id', supportController.update)
router.get("/user/:userId",supportController.getByUserId)
module.exports = router;