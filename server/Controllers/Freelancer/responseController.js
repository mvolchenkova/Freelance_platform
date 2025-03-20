const { Response } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class ResponseController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { responseStatus, proposal, submissionDate, userId } = req.body;
            const response = await Response.create({ responseStatus, proposal, submissionDate, userId });
            return res.status(201).json(response);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const responses = await Response.findAll(); 
            return res.json(responses);
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
    
            const response = await Response.findByPk(id);
            console.log('Найденный пользователь:', response);
    
            if (!response) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { responseStatus, proposal, submissionDate } = req.body;
            const updated = await response.update({ responseStatus, proposal, submissionDate });
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
            const deleted = await Response.destroy({ where: { responseId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Response not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting response:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new ResponseController();