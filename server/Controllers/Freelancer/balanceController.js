const { Balance } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class BalanceController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { current, userId } = req.body;
            const balance = await Balance.create({ current, userId });
            return res.status(201).json(balance);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const balances = await Balance.findAll(); 
            return res.json(balances);
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
    
            const balance = await Balance.findByPk(id);
            console.log('Найденный пользователь:', balance);
    
            if (!balance) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { current } = req.body;
            const updated = await balance.update({ current });
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
            const deleted = await Balance.destroy({ where: { balanceId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Balance not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting balance:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new BalanceController();