const { Transaction } = require('../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class TransactionController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { amount, transactionDate, userId } = req.body;
            const transaction = await Transaction.create({ amount, transactionDate, userId });
            return res.status(201).json(transaction);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const transactions = await Transaction.findAll(); 
            return res.json(transactions);
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
    
            const transaction = await Transaction.findByPk(id);
            console.log('Найденный пользователь:', transaction);
    
            if (!transaction) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { amount, transactionDate, userId } = req.body;
            const updated = await transaction.update({ amount, transactionDate, userId });
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
            const deleted = await Transaction.destroy({ where: { transactionId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting transaction:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new TransactionController();