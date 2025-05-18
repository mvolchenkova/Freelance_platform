const {Support} = require('../../models/models');

class SupportController {
    async create(req, res) {
        try {
          console.log('Incoming body:', req.body); // 👈 Добавь лог
          const support = await Support.create(req.body);
console.log('Created support:', support.toJSON());
          res.status(201).json(support);
        } catch (error) {
          console.error('Create error:', error);   // 👈 Обязательно лог ошибки
          res.status(400).json({ error: error.message });
        }
      }
    async getAll(req, res) {
        try {
            const supports = await Support.findAll();
            res.status(200).json(supports);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const support = await Support.findByPk(req.params.id);
            if (!support) return res.status(404).json({ error: 'Support record not found' });
            res.status(200).json(support);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const support = await Support.update(req.body, { where: { idSupport: req.params.id } });
            if (!support[0]) return res.status(404).json({ error: 'Support record not found' });
            res.status(200).json({ message: 'Support record updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const rowsDeleted = await Support.destroy({ where: { idSupport: req.params.id } });
            if (!rowsDeleted) return res.status(404).json({ error: 'Support record not found' });
            res.status(200).json({ message: 'Support record deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getByUserId(req,res){
        try {
    const supports = await Support.findAll({
      where: { UserId: req.params.userId }
    });
    res.json(supports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch supports by userId' });
  }
    }
}

module.exports = new SupportController();