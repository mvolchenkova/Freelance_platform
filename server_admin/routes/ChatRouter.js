const Router = require('express');
const router = new Router();
const chatController = require('../Controllers/ChatController');

router.get('/',chatController.getChats)
router.get('/:id', chatController.getChatUser)
router.delete('/delete/:id', chatController.deleteChat)

module.exports = router;