const { Deal } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class DealController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { startDate, endDate } = req.body;
            const deal = await Deal.create({ startDate, endDate });
            return res.status(201).json(deal);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const deals = await Deal.findAll(); 
            return res.json(deals);
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
    
            const deal = await Deal.findByPk(id);
            console.log('Найденный пользователь:', deal);
    
            if (!deal) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { startDate, endDate } = req.body;
            const updated = await deal.update({ startDate, endDate });
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
            const deleted = await Deal.destroy({ where: { dealId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Deal not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting deal:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new DealController();