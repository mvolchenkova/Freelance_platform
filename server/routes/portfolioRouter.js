const Router = require('express')
const router = new Router()
const portfolioController = require('../controllers/portfolioController')

router.post('/', portfolioController.create)
router.get('/', portfolioController.getAll)
router.put('/:id', portfolioController.update);
router.delete('/:id', portfolioController.delete);

module.exports = router