const Router = require('express')
const router = new Router();

const ChatRouter = require('./ChatRouter')
const CustomerRouter = require('./CustomerRouter')
const ProposalRouter = require('./ProposalRouter')
const RequestRouter = require('./RequestRouter')
const SavedFreelancerRouter = require('./SavedFreelancerRouter')
const StatRouter = require('./StatRouter')
const SupportRouter = require('./SupportRouter')
const TransactionRouter = require('./TransactionRouter')
const VacancieRouter = require('./VacancieRouter')


router.use('/Chat',ChatRouter)
router.use('/user',CustomerRouter)
router.use('/Proposal',ProposalRouter)
router.use('/Request',RequestRouter)
router.use('/SavedFreelancer',SavedFreelancerRouter)
router.use('/Stat',StatRouter)
router.use('/Support',SupportRouter)
router.use('/Transaction',TransactionRouter)
router.use('/Vacancie',VacancieRouter)

module.exports = router;