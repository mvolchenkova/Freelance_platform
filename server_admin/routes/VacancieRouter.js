const Router = require('express');
const router = new Router();
const vacancieController = require('../Controllers/VacancieController')

router.get('/',vacancieController.getVacancie)
router.post('/create/:id',vacancieController.createVacancie);
router.delete('/delete/:id',vacancieController.deleteVacancie)

module.exports = router;