const Router = require('express');
const router = new Router();
const statController = require('../Controllers/Customer/StatController');

router.get('/',statController.getAllStat)
router.post('/create/:id',statController.createStat)
router.put('/update/:id',statController.updateStat);
router.get('/:id', statController.getStatCustomer)

module.exports = router;