const {Support} = require('../models/models');

class SupportController {
    async getSupport(req, res){
        const { sortBy = 'idSupport', order = 'ASC'} = req.query;

        const support = await Support.findAndCountAll({
            order: [[sortBy,order]]
        });
            
        
        return res.json({
            total: support.count,
            data: support.rows
        })
    }
    async createSupport(req,res){
        const {id} = req.params
        const {question} = req.body

        try{
            const support = await Support.create({
                question: question,
                CustomerIdCustomer: id,
                timeOfAsk: new Date()
            })
            return res.status(200).json(support)
        }catch(error){
            return res.status(500).json('Internal server error '+error)
        }
    }
    async updateSupport(req,res){
        const {id} = req.params
        const {answer} = req.body

        try{    
            const support = await Support.findByPk(id)
            if(!support){
                return res.status(404).json('Question is not found')
            }
            await support.update(answer);
            return res.status(201).json('Data has been updated')
        }catch(error){
            return res.status(500).json('Interna; server error')
        }
    }
}

module.exports = new SupportController();