const jwt = require('jsonwebtoken')
const {Token} = require('../models/models')

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload,process.env.SECRET_KEY, {expiresIn:'30m'})
        const refreshToken = jwt.sign(payload,process.env.SECRET_REFRESH_KEY, {expiresIn:'5d'})
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.SECRET_KEY)
            return userData 
        }catch(error){
            return null;
        }
    }
    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.SECRET_REFRESH_KEY)
            return userData 
        }catch(error){
            return null;
        }
    }
    async saveToken(id, refreshToken){
        const datatoken = await Token.findOne({
            where:{
                idUser:id}
        })
        if(datatoken){
            datatoken.refreshToken = refreshToken;
            return datatoken.save();
        }
        const token = await Token.create({idUser:id,refreshToken});
        return token;
        
    }
    async removeToken(refreshToken){     
        const tokenData = await Token.destroy({
            where:{
                refreshToken: refreshToken
            }
        })
        return tokenData;
    }
    async findToken(refreshToken){
        const tokenData = await Token.findOne({
            where:{
                refreshToken: refreshToken
            }
        })
        return tokenData;
    }
}

module.exports = new TokenService()