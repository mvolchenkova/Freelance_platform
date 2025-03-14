const {Category} = require('../models/models')

class CategoryController{
        async create(req, res) {
            try {
                const category = await Category.create(req.body);
                res.status(201).json(category);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
        async getAll(req, res) {
            try {
                const categories = await Category.findAll();
                res.status(200).json(categories);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
        async getById(req, res) {
            try {
                const category = await Category.findByPk(req.params.id);
                if (!category) return res.status(404).json({ error: 'Category not found' });
                res.status(200).json(category);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
        async update(req, res) {
            try {
                const category = await Category.update(req.body, { where: { idCategory: req.params.id } });
                if (!category[0]) return res.status(404).json({ error: 'Category not found' });
                res.status(200).json({ message: 'Category updated successfully' });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
        async delete(req, res) {
            try {
                const rowsDeleted = await Category.destroy({ where: { idCategory: req.params.id } });
                if (!rowsDeleted) return res.status(404).json({ error: 'Category not found' });
                res.status(200).json({ message: 'Category deleted successfully' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
}

module.exports = new CategoryController();