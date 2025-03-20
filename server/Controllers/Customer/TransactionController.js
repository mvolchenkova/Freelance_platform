const {Transaction} = require('../../models/models');
class TransactionController {
    async getTransaction(req,res){
        const { sortBy = 'idCategory', order = 'ASC'} = req.query;
        const where = {}
        const transaction = await Transaction.findAndCountAll({
            where,
            order: [[sortBy,order]]
        });
        return res.json({
            total: transaction.count,
            data: transaction.rows
        })
    }
    async createTransaction(req,res){
        const {isComplete, cost, idFreelancer} = req.body;
        try{
            const transaction = await Transaction.create({
                isComplete: isComplete,
                cost: cost,
                idFreelancer: idFreelancer
            })
            return res.status(201).json(transaction);
        }catch(error){
            res.status(500).json('Something went wrong');
        }
    }
    async updateTransaction(req,res){
        const id = req.params.id
        try{
            const transaction = await Transaction.findByPk(id);
            if(!transaction){
                return res.status(404).json('Transaction not found');
            }
            transaction.update(!isComplete);
            return res.status(202).json('Transaction is complete')
        }catch(error){
            return res.status(500).json('Something went wrong');
        }
    }
}

module.exports = new TransactionController();