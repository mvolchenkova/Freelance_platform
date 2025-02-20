const {Customer} = require('../models/models');
class CustomerController {
    async getCustomer(req, res){
        const { sortBy = 'idCustomer', order = 'ASC' } = req.query;
        const where = {}

        const customer = await Customer.findAndCountAll({
            where,
            order: [[sortBy,order]]
        });
        return res.json({
            total: customer.count,
            data: customer.rows
        })
    }
    async getCustomerById(req,res){
        const {id} = req.params
        try{
            const customer = await Customer.findByPk(id);
            if(!customer){
                return res.status(404).json('user is not found')
            }
            return res.status(200).json(customer);
        }catch(error){
            return res.status(500).json('Internal server error')
        }
    }
    async createCustomer(req,res){
        const {firstname,lastname,mail,phone,birthdayDate} = req.body
        try{
            const customer = await Customer.create({
                firstname:firstname,
                lastname:lastname,
                mail:mail,
                phone:phone,
                birthdayDate:birthdayDate
            })
            return res.status(200).json(customer)
        }catch(error){
            return res.status(500).json(`Internal server error ${error.message}`)
        }
    }
}

module.exports = new CustomerController();