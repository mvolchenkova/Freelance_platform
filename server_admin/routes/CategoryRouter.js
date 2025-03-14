const Router = require('express');
const router = new Router();
const categoryController = require('../Controllers/CategoryController')

router.get('/', categoryController.getCategory);

module.exports = router;