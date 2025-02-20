const { Project } = require('../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class ProjectController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { title, description } = req.body;
            const project = await Project.create({ title, description });
            return res.status(201).json(project);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const projects = await Project.findAll(); 
            return res.json(projects);
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
    
            const project = await Project.findByPk(id);
            console.log('Найденный пользователь:', project);
    
            if (!project) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { title, description } = req.body;
            const updated = await project.update({ title, description });
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
            const deleted = await Project.destroy({ where: { projectId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Project not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting project:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new ProjectController();