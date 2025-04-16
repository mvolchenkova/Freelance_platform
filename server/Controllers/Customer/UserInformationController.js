const {UserInformation} = require('../../models/models');

class UserInformationController {
    async getInfByUser(req,res){
        try{
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const id = user.user.id;
            const userInf = await UserInformation.findByPk(id);
            return res.json(userInf);
        } catch(error){
            return res.status(500).json(error);
        }
    }
}

module.exports = new UserInformationController();