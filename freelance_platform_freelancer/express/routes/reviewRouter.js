const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')

router.post('/', reviewController.create)
router.get('/', reviewController.getAll)
router.put('/:id', reviewController.update);
router.delete('/:id', reviewController.delete);

module.exports = router