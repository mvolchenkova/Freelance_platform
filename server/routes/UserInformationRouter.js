const Router = require('express');
const router = new Router();
const UserInformationController = require('../Controllers/Customer/UserInformationController');
router.get('/:id',UserInformationController.getInfByUser);
router.post('/:id',UserInformationController.updateInf);
module.exports = router