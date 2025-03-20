const { Portfolio } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class PortfolioController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { workExperience, userId } = req.body;
            const portfolio = await Portfolio.create({ workExperience, userId });
            return res.status(201).json(portfolio);
        } catch (error) {
            console.error('Ошибка при создании портфолио:', error);
            return res.status(500).json({ message: 'Ошибка при создании портфолио' });
        }
    }

    async getAll(req, res) {
        try {
            const portfolios = await Portfolio.findAll(); // Получаем все отзывы
            return res.json(portfolios);
        } catch (error) {
            console.error('Ошибка при получении портфолио:', error);
            return res.status(500).json({ message: 'Ошибка при получении портфолио' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            
            if (!id) {
                return res.status(400).json({ message: 'ID портфолио не указан' });
            }
    
            console.log('ID портфолио:', id);
            console.log('Данные для обновления:', req.body);
    
            const portfolio = await Portfolio.findByPk(id);
            console.log('Найденный портфолио:', portfolio);
    
            if (!portfolio) {
                return res.status(404).json({ message: 'портфолио не найден' });
            }
    
            const { workExperience } = req.body;
            const updated = await portfolio.update({ workExperience });
            console.log('Обновленный портфолио:', updated);
    
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
            const deleted = await Portfolio.destroy({ where: { portfolioId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new PortfolioController();