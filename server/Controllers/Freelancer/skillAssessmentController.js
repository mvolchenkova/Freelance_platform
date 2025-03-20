const { SkillAssessment } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class SkillAssessmentController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { score, assessmentDate } = req.body;
            const skillassessment = await SkillAssessment.create({  score, assessmentDate });
            return res.status(201).json(skillassessment);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const skillassessments = await SkillAssessment.findAll(); 
            return res.json(skillassessments);
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
    
            const skillassessment = await SkillAssessment.findByPk(id);
            console.log('Найденный пользователь:', skillassessment);
    
            if (!skillassessment) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const {  score, assessmentDate } = req.body;
            const updated = await skillassessment.update({  score, assessmentDate });
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
            const deleted = await SkillAssessment.destroy({ where: { assessmentId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'SkillAssessment not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting skillassessment:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new SkillAssessmentController();