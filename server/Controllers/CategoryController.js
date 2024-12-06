const {Category} = require('../models/models')

class CategoryController{
    async getCategory(req, res){
        const { sortBy = 'idCategory', order = 'ASC', filter = {} } = req.query;
        const where = {}

        for(const key in filter){
            if(filter.hasOwnProperty(key)){
                where[key] = filter[key];
            }
        }
        const category = await Category.findAndCountAll({
            where,
            order: [[sortBy,order]]
        });
            
        
        return res.json({
            total: category.count,
            data: category.rows
        })
    }
}

module.exports = new CategoryController();