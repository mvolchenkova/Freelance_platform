const Router = require('express');
const router = new Router();
const savedFreelancerController = require('../Controllers/Customer/SavedFreelancerController');

router.get('/',savedFreelancerController.getAllSavedFreelancer)
router.delete('/delete/:id', savedFreelancerController.deleteSavedFreelancer)
router.post('/add/:id',savedFreelancerController.addSavedFreelancer)
router.get('/:id',savedFreelancerController.getUserSavedFreelancer)

module.exports = router;