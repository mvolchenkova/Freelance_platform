const Router = require('express');
const router = new Router();
const vacancieController = require('../Controllers/Customer/VacancieController')

router.get('/',vacancieController.getVacancie)
router.get('/:id',vacancieController.getVacanciesbyUserId)
router.post('/create/:id',vacancieController.createVacancie);
router.delete('/delete/:id',vacancieController.deleteVacancie)
router.post('/publish/:id',vacancieController.publishVacancie)
module.exports = router;