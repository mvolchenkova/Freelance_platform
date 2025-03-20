const {Vacancie} = require('../../models/models');
class VacancieController {
    async getVacancie(req, res){
        const { sortBy = 'idVacancie', order = 'ASC', filter = {} } = req.query;
        const where = {}

        for(const key in filter){
            if(filter.hasOwnProperty(key)){
                where[key] = filter[key];
            }
        }
        const category = await Vacancie.findAndCountAll({
            where,
            order: [[sortBy,order]]
        });
            
        
        return res.json({
            total: category.count,
            data: category.rows
        })
    }
    async createVacancie(req,res){
        const {id} = req.params
        const {description,skills} = req.body

        try{
            const vacancie = await Vacancie.create({
                description: description,
                skills: skills,
                CustomerIdCustomer: id
            })
            return res.status(200).json(vacancie)
        }catch(error){
            return res.status(500).json(`Internal server error ${error.message}`)
        }
    }
    async deleteVacancie(req,res){
        const {id} = req.params
        try{
            const vacancie = await Vacancie.findByPk(id)
            if(!vacancie){
                return res.status(404).json('vacancie is not found')
            }
            vacancie.destroy();
            return res.status(201).json('data is deleted');
        }catch(error){
            return res.status(500).json('Interna; server error')
        }
    }
}

module.exports = new VacancieController();