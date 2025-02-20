const { AdditionalService } = require('../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class AddServiceController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { serviceName, description, price } = req.body;
            const addservice = await AdditionalService.create({ serviceName, description, price });
            return res.status(201).json(addservice);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const addservices = await AdditionalService.findAll(); 
            return res.json(addservices);
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
    
            const addservice = await AdditionalService.findByPk(id);
            console.log('Найденный пользователь:', addservice);
    
            if (!addservice) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { serviceName, description, price } = req.body;
            const updated = await addservice.update({ serviceName, description, price });
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
            const deleted = await AdditionalService.destroy({ where: { serviceId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'AddService not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting addservice:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new AddServiceController();