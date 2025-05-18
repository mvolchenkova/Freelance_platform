const Router = require('express');
const router = new Router();
const reportController = require('../Controllers/Admin/ReportController');

router.post('/', reportController.create);
router.get('/', reportController.getAll);
router.get('/:id', reportController.getById);
router.put('/:id', reportController.update);
router.delete('/:id', reportController.delete);

module.exports = router;
