const Router = require('express');
const router = new Router();
const requestController = require('../Controllers/RequestController')

router.get('/',requestController.getRequest)
router.delete('/delete/:id',requestController.deleteRequest)

module.exports = router;