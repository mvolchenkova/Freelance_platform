const Router = require('express')
const router = new Router()
const responseController = require('../controllers/responseController')

router.post('/', responseController.create)
router.get('/', responseController.getAll)
router.put('/:id', responseController.update);
router.delete('/:id', responseController.delete);

module.exports = router