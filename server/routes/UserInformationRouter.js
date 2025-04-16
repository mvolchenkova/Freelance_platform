const Router = require('express');
const router = new Router();
const UserInformationController = require('../Controllers/Customer/UserInformationController');
router.get('/',UserInformationController.getInfByUser);

module.exports = router