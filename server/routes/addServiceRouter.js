const Router = require('express')
const router = new Router()
const addServiceController = require('../Controllers/Freelancer/addServiceController')

router.post('/:idUser', addServiceController.create)
router.get('/', addServiceController.getAll)
router.put('/:id', addServiceController.update);
router.delete('/:id', addServiceController.delete);
router.get('/byId/:id', addServiceController.getById)

module.exports = router