const Router = require('express')
const router = new Router()
const fineController = require('../Controllers/Admin/FineController')

router.post('/', fineController.create)
router.get('/', fineController.getAll)
router.get('/:id', fineController.getById)
router.put('/:id', fineController.update);
router.delete('/:id', fineController.delete);
router.get('/user/:userId', fineController.getByUserId);

module.exports = router