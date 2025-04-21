const { AdditionalService, User } = require('../../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class AddServiceController {
    // Создание новой записи
    async create(req, res) {
        try {
            const {idUser} = req.params
            const { serviceName, description, price } = req.body;
            const addservice = await AdditionalService.create({ serviceName, description, price, idUser });  
        

            return res.status(201).json(addservice);
        } catch (error) {
            console.error('Ошибка при создании service:', error);
            return res.status(500).json({ message: 'Ошибка server' });
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
    
    
            const addservice = await AdditionalService.findByPk(id);
    
            if (!addservice) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { serviceName, description, price } = req.body;
            const updated = await addservice.update({ serviceName, description, price });
    
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
    //получение по id
    async getById(req, res) {
        try {
          const { id } = req.params;
      
          const services = await AdditionalService.findAll({
            where: {
              idUser: id, 
            },
          });
      
          return res.status(200).json(services);
        } catch (error) {
          console.error('Error fetching services by IDs:', error);
          return res.status(500).json({ message: 'Server error' });
        }
      }
      
}

module.exports = new AddServiceController();