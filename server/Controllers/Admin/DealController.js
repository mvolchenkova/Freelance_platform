const {Deal} = require('../../models/models');
class DealController {
    async create(req, res) {
        try {
            const deal = await Deal.create(req.body);
            res.status(201).json(deal);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const deals = await Deal.findAll();
            res.status(200).json(deals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const deal = await Deal.findByPk(req.params.id);
            if (!deal) return res.status(404).json({ error: 'Deal not found' });
            res.status(200).json(deal);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const deal = await Deal.update(req.body, { where: { idDeal: req.params.id } });
            if (!deal[0]) return res.status(404).json({ error: 'Deal not found' });
            res.status(200).json({ message: 'Deal updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const rowsDeleted = await Deal.destroy({ where: { idDeal: req.params.id } });
            if (!rowsDeleted) return res.status(404).json({ error: 'Deal not found' });
            res.status(200).json({ message: 'Deal deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DealController();