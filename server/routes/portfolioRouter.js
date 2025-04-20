const Router = require('express')
const router = new Router()
const portfolioController = require('../Controllers/Freelancer/portfolioController')

router.post('/', portfolioController.create)
router.get('/', portfolioController.getAll)
router.put('/:id', portfolioController.update);
router.delete('/:id', portfolioController.delete);
router.get('/getByUserId/:id', portfolioController.getByUserId)

module.exports = router