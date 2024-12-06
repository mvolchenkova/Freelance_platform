const {Request} = require('../models/models');
class RequestController {
    async getRequest(req, res){
        const { page = 1, limit = 10, sortBy = 'idRequest', order = 'ASC'} = req.query;
        const offset = (page - 1) * limit;
        const where = {}
        

        const request = await Request.findAndCountAll({
            where,
            limit,
            offset,
            order: [[sortBy,order]]
        });
            
        
            return res.json({
                total: request.count,
                pages: Math.ceil(request.count / limit),
                data: request.rows
            })
    }
    async deleteRequest(req, res){
        const id = req.params.id;
        try{
            const request = await Request.findByPk(id);
            if(!request){
                res.status(404).json('Request not found')
            }
            await request.destroy();
            return res.status(201).json('Request is deleted');
        }catch(error){
           return res.status(500).json("Something went wrong");
        }
    }
}

module.exports = new RequestController();