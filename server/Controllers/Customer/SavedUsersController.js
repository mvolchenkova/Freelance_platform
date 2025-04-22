const {SavedUsers, UserInformation, User} = require('../../models/models')
class SavedUsersController{
    async getAllSavedUsers(req, res){
        const { sortBy = 'idCustomer', order = 'ASC' } = req.query;

        const savedFreelancer = await SavedUsers.findAndCountAll({
            order: [[sortBy,order]]
        });
        return res.json({
            total: savedFreelancer.count,
            data: savedFreelancer.rows
        })
    }
    async addSavedUser(req,res){
        const {id} = req.params
        const {idUser} = req.body;
        try{
            const savedFreelancer = await SavedUsers.create({
                UserIdUser: id,
                idUser: idUser
            })
            return res.status(200).json(savedFreelancer);
        }catch(error){
            return res.status(500).json(error)
        }
    }
    async deleteSavedUser(req,res){
        const {id} = req.params

        try{
            const savedFreelancer = await SavedUsers.findOne({where:{
                idUser:id}});
            if(!savedFreelancer){
                return res.status(404).json('Saved freelacer not found')
            }
            await savedFreelancer.destroy();
            return res.status(200).json('Saved freelancer is deleted')
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    async getUserSavedUser(req,res){
        const {id} = req.params

        try{
            const userSavedFreelancer = await SavedUsers.findAll({
                where:{
                    UserIdUser: id
                },
                include:{
                    model: User,
                    as: 'SavedUser',
                    include: [UserInformation]
                }
            })
            if(!userSavedFreelancer){
                return res.satus(404).json('Saved freelancers not found by idStat')
            }
            return res.status(200).json(userSavedFreelancer);
            
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}
module.exports = new SavedUsersController();