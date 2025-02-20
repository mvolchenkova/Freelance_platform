const { Language } = require('../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class LanguageController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { langName, proficiencyLevel } = req.body;
            const language = await Language.create({ langName, proficiencyLevel });
            return res.status(201).json(language);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const languages = await Language.findAll(); 
            return res.json(languages);
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
    
            const language = await Language.findByPk(id);
            console.log('Найденный пользователь:', language);
    
            if (!language) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { langName, proficiencyLevel } = req.body;
            const updated = await language.update({ langName, proficiencyLevel });
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
            const deleted = await Language.destroy({ where: { languageId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Language not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting language:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new LanguageController();