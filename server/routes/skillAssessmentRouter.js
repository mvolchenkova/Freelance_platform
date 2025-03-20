const Router = require('express')
const router = new Router()
const skillAssessmentController = require('../controllers/skillAssessmentController')

router.post('/', skillAssessmentController.create)
router.get('/', skillAssessmentController.getAll)
router.put('/:id', skillAssessmentController.update);
router.delete('/:id', skillAssessmentController.delete);

module.exports = router