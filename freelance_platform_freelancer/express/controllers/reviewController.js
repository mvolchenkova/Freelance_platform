const { Review } = require('../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class ReviewController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { rating, comment, reviewDate } = req.body;
            const review = await Review.create({ rating, comment, reviewDate });
            return res.status(201).json(review);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const reviews = await Review.findAll(); 
            return res.json(reviews);
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
    
            const review = await Review.findByPk(id);
            console.log('Найденный пользователь:', review);
    
            if (!review) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { rating, comment, reviewDate } = req.body;
            const updated = await review.update({ rating, comment, reviewDate });
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
            const deleted = await Review.destroy({ where: { reviewId: id } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'Review not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting review:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new ReviewController();