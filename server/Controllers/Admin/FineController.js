
const {Fine} = require('../../models/models')
class FineController{
    async create(req, res) {
        try {
            const fine = await Fine.create(req.body);
            res.status(201).json(fine);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const fines = await Fine.findAll();
            res.status(200).json(fines);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const fine = await Fine.findByPk(req.params.id);
            if (!fine) return res.status(404).json({ error: 'Fine not found' });
            res.status(200).json(fine);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const fine = await Fine.update(req.body, { where: { idFine: req.params.id } });
            if (!fine[0]) return res.status(404).json({ error: 'Fine not found' });
            res.status(200).json({ message: 'Fine updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const rowsDeleted = await Fine.destroy({ where: { idFine: req.params.id } });
            if (!rowsDeleted) return res.status(404).json({ error: 'Fine not found' });
            res.status(200).json({ message: 'Fine deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getByUserId(req, res) {
        try {
            const fines = await Fine.findAll({ 
                where: { idUser: req.params.userId },
                order: [['createdAt', 'DESC']] // Optional: order by newest first
            });
            res.status(200).json(fines);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new FineController();