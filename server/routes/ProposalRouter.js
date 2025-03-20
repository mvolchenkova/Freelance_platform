const Router = require('express');
const router = new Router();
const proposalController = require('../Controllers/Customer/ProposalController')

router.get('/',proposalController.getProposal)
router.post('/create/:id',proposalController.createProposal)
router.delete('/delete/:id',proposalController.deleteProposal)
router.put('/update/:id',proposalController.PublishProposal)

module.exports = router;