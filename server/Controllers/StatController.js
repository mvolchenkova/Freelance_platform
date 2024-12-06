const {Stat} = require('../models/models');
class StatController {
    async getAllStat(req,res){
        const { sortBy = 'idSupport', order = 'ASC', filter = {} } = req.query;
        const support = await Stat.findAndCountAll({
            order: [[sortBy,order]]
        }); 
        return res.json({
            total: support.count,
            data: support.rows
        })
    }
    async getStatCustomer(req,res){
        const {id} = req.params
        try{
            const statCustomer = await Stat.findAll({
                where:{CustomerIdCustomer: id}
            })
            if(!statCustomer){
                return res.status(404).json('Stat not found')
            }
            return res.status(200).json(statCustomer)
        }catch(error){
            return res.status(500).json('Internal server error')
        }
    }
    async createStat(req,res){
        const {idCustomer} = req.params;
        try{
            const stat = await Stat.create({
                information:null,
                countOfCompletedProposal:0,
                CustomerIdCustomer: idCustomer
            })
            return res.status(200).json(stat)
        }catch(error){
            return res.status(500).json('Internal server error')
        }
    }
    async updateStat(req,res){
        const {id} = req.params;
        const {information, countOfCompletedProposal} = req.body;
        try{
            const stat = await Stat.findByPk(id);
            if(!stat){
                return res.status(404).json('Stat is not found');
            }
            await stat.update(information,countOfCompletedProposal)

        }catch(error){
            return res.status(500).json('Internal server error')
        }
    }
}

module.exports = new StatController();