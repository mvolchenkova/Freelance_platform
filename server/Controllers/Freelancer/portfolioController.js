const { Portfolio, User } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class PortfolioController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { idUser } = req.body;
            const portfolio = await Portfolio.create({ idUser });
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
            const { id } = req.params; 
            if (!id) {
                return res.status(400).json({ message: 'ID портфолио не указан' });
            }
    
            const portfolio = await Portfolio.findByPk(id); 
    
            if (!portfolio) {
                return res.status(404).json({ message: 'Портфолио не найдено' });
            }
    
            const { phone, skills, workExperience, education } = req.body;
            const updatedPortfolio = await portfolio.update({ phone, skills, workExperience, education });
    
            return res.json(updatedPortfolio); 
        } catch (error) {
            console.error('Ошибка при обновлении портфолио:', error);
            return res.status(500).json({ message: 'Ошибка server' });
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

    async getByUserId(req, res) {
        try {
            const { id } = req.params;
            const portfolio = await Portfolio.findOne({ where: { idUser: id } }); 
    
            if (!portfolio) { 
                return res.status(404).json({ message: 'Портфолио не найдено' });
            }
    
            return res.status(200).json(portfolio); 
        } catch (error) {
            console.error('Ошибка при поиске портфолио:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new PortfolioController();