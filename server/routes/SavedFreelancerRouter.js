const Router = require('express');
const router = new Router();
const savedFreelancerController = require('../Controllers/Customer/SavedUsersController');

router.get('/',savedFreelancerController.getAllSavedUsers)
router.delete('/delete/:id', savedFreelancerController.deleteSavedUser)
router.post('/add/:id',savedFreelancerController.addSavedUser)
router.get('/:id',savedFreelancerController.getUserSavedUser)

module.exports = router;