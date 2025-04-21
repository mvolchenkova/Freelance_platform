const { User } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class UserController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { userName, surname, phone, password, email, profilePicture, birthDate, role, rating } = req.body;
            const user = await User.create({ userName, surname, phone, password, email, profilePicture, birthDate, role, rating });
            return res.status(201).json(user);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;
            const { count, rows } = await User.findAndCountAll({
                limit,
                offset,
            });
            return res.json({ total: count, page, users: rows });
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            return res.status(500).json({ message: 'Ошибка при получении пользователей' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            
            if (!id) {
                return res.status(400).json({ message: 'ID пользователя не указан' });
            }
        
            const user = await User.findByPk(id);
    
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { password, profilePicture, rating } = req.body;
            const updated = await user.update({ password, profilePicture, rating });
    
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
            const deleted = await User.destroy({ where: { userId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    async getUserServices(req, res) {
        try {
          const { id } = req.params;
      
          const userInfo = await User.findOne({
            where: { idUser: id },
          });
      
          if (!userInfo) {
            return res.status(404).json({ message: 'User information not found' });
          }
      
          return res.status(200).json(userInfo.addServices);
        } catch (error) {
          console.error('Error find services:', error);
          return res.status(500).json({ message: 'Server error' });
        }
      }
}

module.exports = new UserController();