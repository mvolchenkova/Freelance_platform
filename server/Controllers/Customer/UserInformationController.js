const {UserInformation } = require('../../models/models');

class UserInformationController {
    async getInfByUser(req,res){
        try{
            const {id} = req.params
            const userInf = await UserInformation.findByPk(id);
            return res.json(userInf);
        } catch(error){
            return res.status(500).json(error);
        }
    }
    async updateInf(req,res){
        try{
            const {id} = req.params
            const { description, salary, location } = req.body;
            const userInf = await UserInformation.findOne({where:{idUser : id}})
            const updatedUser = await userInf.update({
               location, description,
               salary
            })
            return res.status(200).json(updatedUser);
        } catch(error){
            console.error(error)
            return res.status(500).json(error);
        }
       
    }
}

module.exports = new UserInformationController();