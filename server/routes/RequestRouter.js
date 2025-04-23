const Router = require('express');
const router = new Router();
const requestController = require('../Controllers/Customer/RequestController')

router.get('/',requestController.getRequest)
router.delete('/delete/:id',requestController.deleteRequest)
router.post('/:id', requestController.createRequest)
router.put('/acceptRequest/:id', requestController.acceptRequest)
router.put('/rejectRequest/:id',requestController.rejectRequest)

module.exports = router;