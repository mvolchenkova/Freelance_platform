const express = require('express');
const router = express.Router();
const freelancerController = require('../Controllers/Freelancer/freelancerController');

router.get('/', freelancerController.getFreelancers);
router.get('/:id', freelancerController.getFreelancerById);

module.exports = router;