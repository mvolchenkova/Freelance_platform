const {BannedUser} = require('../models/models');
class BannedUserController  {
    async create(req, res) {
        try {
            const bannedUser = await BannedUser.create(req.body);
            res.status(201).json(bannedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const bannedUsers = await BannedUser.findAll();
            res.status(200).json(bannedUsers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const bannedUser = await BannedUser.findByPk(req.params.id);
            if (!bannedUser) return res.status(404).json({ error: 'Banned user not found' });
            res.status(200).json(bannedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const bannedUser = await BannedUser.update(req.body, { where: { idUser: req.params.id } });
            if (!bannedUser[0]) return res.status(404).json({ error: 'Banned user not found' });
            res.status(200).json({ message: 'Banned user updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const rowsDeleted = await BannedUser.destroy({ where: { idUser: req.params.id } });
            if (!rowsDeleted) return res.status(404).json({ error: 'Banned user not found' });
            res.status(200).json({ message: 'Banned user deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = new BannedUserController();