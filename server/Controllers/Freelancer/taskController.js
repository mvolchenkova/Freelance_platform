const { Task } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class TaskController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { title, description, payment, deadline, taskStatus } = req.body;
            const task = await Task.create({ title, description, payment, deadline, taskStatus });
            return res.status(201).json(task);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const tasks = await Task.findAll(); 
            return res.json(tasks);
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
    
            const task = await Task.findByPk(id);
            console.log('Найденный пользователь:', task);
    
            if (!task) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { title, description, payment, deadline, taskStatus } = req.body;
            const updated = await task.update({ title, description, payment, deadline, taskStatus });
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
            const deleted = await Task.destroy({ where: { taskId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting task:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new TaskController();