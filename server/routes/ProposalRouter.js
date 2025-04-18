const Router = require('express');
const router = new Router();
const proposalController = require('../Controllers/Customer/ProposalController')

router.get('/',proposalController.getProposal)
router.post('/create/',proposalController.createProposal)
router.delete('/delete/:id',proposalController.deleteProposal)
router.post('/update/:id',proposalController.PublishProposal)
router.get('/foruser/:id',proposalController.getProposalbyUserId)
module.exports = router;