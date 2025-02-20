const {SavedFreelancer} = require('../models/models')
class SavedFreelancerController{
    async getAllSavedFreelancer(req, res){
        const { sortBy = 'idCustomer', order = 'ASC' } = req.query;

        const savedFreelancer = await SavedFreelancer.findAndCountAll({
            order: [[sortBy,order]]
        });
        return res.json({
            total: savedFreelancer.count,
            data: savedFreelancer.rows
        })
    }
    async addSavedFreelancer(req,res){
        const {idStats} = req.params
        const {idFreelancer} = req.body;
        try{
            const savedFreelancer = await SavedFreelancer.create({
                StatIdStat: idStats,
                idFreelancer: idFreelancer
            })
            return res.status(200).json(savedFreelancer);
        }catch(error){
            return res.status(500).json('Internal server error')
        }
    }
    async deleteSavedFreelancer(req,res){
        const {id} = req.params

        try{
            const savedFreelancer = await SavedFreelancer.findByPk(id);
            if(!savedFreelancer){
                return res.status(404).json('Saved freelacer not found')
            }
            await savedFreelancer.destroy();
            return res.status(200).json('Saved freelancer is deleted')
        }catch(error){
            return res.status(500).json('Internal server error')
        }
    }
    async getUserSavedFreelancer(req,res){
        const {idStat} = req.params

        try{
            const [userSavedFreelancer] = await SavedFreelancerController.findAll({
                where:{
                    idStat: idStat
                }
            })
            if(!userSavedFreelancer){
                return res.satus(404).json('Saved freelancers not found by idStat')
            }
            return res.status(200).json(userSavedFreelancer);
            
        }catch(error){
            return res.status(500).json('Internal server error')
        }
    }
}
module.exports = new SavedFreelancerController();