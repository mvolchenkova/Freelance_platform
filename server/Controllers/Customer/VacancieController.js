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
    async getVacanciesbyUserId(req,res){
        const {id} = req.params;
        try{
            const vacancie = await Vacancie.findAll({
                where:{
                    UserIdUser: id
                }
            })
            return res.status(200).json(vacancie)
        } catch (error){
            console.error(error)
            return res.status(500).json('Internal server error '+error)
        }
    }
    async createVacancie(req,res){
        const {id} = req.params
        const {description,skills, title, salary, isPublished} = req.body

        try{
            const vacancie = await Vacancie.create({
                title,
                salary,
                description,
                skills,
                isPublished,
                UserIdUser: id
            })
            return res.status(200).json(vacancie)
        }catch(error){
            console.error(error)
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
            return res.status(500).json('Internal server error')
        }
    }
    async publishVacancie(req,res){
        const {id} = req.params
        const {isPublished} = req.body
        try{
            const vacancie = await Vacancie.findByPk(id)
            if(!vacancie){
                return res.status(404).json('Vacancie not found')
            }
            const response = await vacancie.update({
                isPublished: isPublished
            })
            return res.status(201).json({message:`Vacancie updated ${response}`})
        } catch (error){
            console.error(error)
            return res.status(500).json('Internal server error')
        }
    }
}

module.exports = new VacancieController();