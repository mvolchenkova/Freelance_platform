const {Request, User} = require('../../models/models');
class RequestController {

    async createRequest(req, res){
        try{
            const {id} = req.params;
            const {idCustomer} = req.body;
            const request = await Request.create(
                {
                    idFreelancer: id,
                    UserIdUser: idCustomer
                }
            )
            return res.status(201).json(request);
        }
        catch(error){
            return res.status(500).json(error.message);
        }
    }
    async acceptRequest(req, res){
        try{
            const {id} = req. params;

            const request = await Request.findByPk(id)

            const confirmedRequest = await request.update({isConfirmed: true})

            return res.status(201).json(confirmedRequest);

        }
        catch(error){
            return res.status(500).json("Something went wrong");
        }
    }

    async rejectRequest(req, res){
        try{
            const {id} = req. params;

            const request = await Request.findByPk(id)

            const rejectedRequest = await request.update({isConfirmed: false})

            return res.status(201).json(rejectedRequest);

        }
        catch(error){
            return res.status(500).json("Something went wrong");
        }
    }

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