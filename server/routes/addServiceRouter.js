const Router = require('express')
const router = new Router()
const addServiceController = require('../controllers/addServiceController')

router.post('/', addServiceController.create)
router.get('/', addServiceController.getAll)
router.put('/:id', addServiceController.update);
router.delete('/:id', addServiceController.delete);

module.exports = router