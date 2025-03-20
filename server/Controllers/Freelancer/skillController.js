const { Skill } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class SkillController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { skillName } = req.body;
            const skill = await Skill.create({ skillName });
            return res.status(201).json(skill);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const skills = await Skill.findAll(); 
            return res.json(skills);
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
    
            const skill = await Skill.findByPk(id);
            console.log('Найденный пользователь:', skill);
    
            if (!skill) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { skillName } = req.body;
            const updated = await skill.update({ skillName });
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
            const deleted = await Skill.destroy({ where: { skillId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Skill not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting skill:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new SkillController();