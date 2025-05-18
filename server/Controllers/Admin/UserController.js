const {User} = require('../../models/models')

class UserController {
    async create(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const user = await User.update(req.body, { where: { idUser: req.params.id } });
            if (!user[0]) return res.status(404).json({ error: 'User not found' });
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const rowsDeleted = await User.destroy({ where: { idUser: req.params.id } });
            if (!rowsDeleted) return res.status(404).json({ error: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async blockUser(req, res) {
        try {
            const userId = req.params.id; // Assuming you pass the user ID in the request parameters
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Toggle the isBlocked status
            await user.update({ isBlocked: !user.isBlocked });

            res.status(200).json({ message: 'User block status updated successfully', isBlocked: user.isBlocked });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
module.exports = new UserController();