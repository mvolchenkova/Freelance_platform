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
const UserInformationRouter = require('./UserInformationRouter')
const categoryRouter = require('./categoryRouter')

router.use('/Chat',ChatRouter)
router.use('/user',CustomerRouter)
router.use('/proposal',ProposalRouter)
router.use('/Request',RequestRouter)
router.use('/SavedFreelancer',SavedFreelancerRouter)
router.use('/Stat',StatRouter)
router.use('/Support',SupportRouter)
router.use('/Transaction',TransactionRouter)
router.use('/Vacancie',VacancieRouter)
router.use('/UserInformation', UserInformationRouter)
router.use('/category',categoryRouter)

module.exports = router;