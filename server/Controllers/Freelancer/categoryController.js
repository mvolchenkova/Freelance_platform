const { Category } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class TaskController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { categoryName } = req.body;
            const category = await Category.create({ categoryName });
            return res.status(201).json(category);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const categories = await Category.findAll(); 
            return res.json(categories);
        } catch (error) {
            console.error('Ошибка при получении портфолио:', error);
            return res.status(500).json({ message: 'Ошибка при получении портфолио' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            
            if (!id) {
                return res.status(400).json({ message: 'ID пользователя не указан' });
            }
    
            console.log('ID пользователя:', id);
            console.log('Данные для обновления:', req.body);
    
            const category = await Category.findByPk(id);
    
            if (!category) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { categoryName } = req.body;
            const updated = await category.update({ categoryName });
            console.log('Обновленный пользователь:', updated);
    
            return res.json(updated); // Возвращаем обновленного пользователя
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
        }
    }
    
    // Удаление записи
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Category.destroy({ where: { categoryId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting task:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new TaskController();