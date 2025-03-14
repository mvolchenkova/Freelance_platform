const {Transaction} = require('../models/models');
class TransactionController {
    async create(req, res) {
        try {
            const transaction = await Transaction.create(req.body);
            res.status(201).json(transaction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const transactions = await Transaction.findAll();
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const transaction = await Transaction.findByPk(req.params.id);
            if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const transaction = await Transaction.update(req.body, { where: { idTransaction: req.params.id } });
            if (!transaction[0]) return res.status(404).json({ error: 'Transaction not found' });
            res.status(200).json({ message: 'Transaction updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const rowsDeleted = await Transaction.destroy({ where: { idTransaction: req.params.id } });
            if (!rowsDeleted) return res.status(404).json({ error: 'Transaction not found' });
            res.status(200).json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TransactionController();