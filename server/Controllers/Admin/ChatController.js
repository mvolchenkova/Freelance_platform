const {Chat} = require('../../models/models')
class ChatController{
    async create(req, res) {
        try {
            const chat = await Chat.create(req.body);
            res.status(201).json(chat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const chats = await Chat.findAll();
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const chat = await Chat.findByPk(req.params.id);
            if (!chat) return res.status(404).json({ error: 'Chat not found' });
            res.status(200).json(chat);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const chat = await Chat.update(req.body, { where: { idChat: req.params.id } });
            if (!chat[0]) return res.status(404).json({ error: 'Chat not found' });
            res.status(200).json({ message: 'Chat updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const rowsDeleted = await Chat.destroy({ where: { idChat: req.params.id } });
            if (!rowsDeleted) return res.status(404).json({ error: 'Chat not found' });
            res.status(200).json({ message: 'Chat deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ChatController();