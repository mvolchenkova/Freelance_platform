const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const TokenService = require('./tokenService')
const UserDto = require('../dto/UserDto')

class UserService{
    async registration(email,password,login, name){
        const user = await User.findOne({
            where:{
                email:email
            }
        })
        if(user){
            throw new Error("User is already registered by this email");
        }
        const hashpassword = await bcrypt.hash(password, 3);
        const userReg = await User.create({email,password:hashpassword,login, isBlocked:0, role:'customer', name: name })
        const userDto = new UserDto(userReg)
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return{
            ...tokens,
            user:userDto
        }
    }
    async login(email,password){
        
        const user = await User.findOne({
            where:{
                email: email
            }
        })
        if(!user){
            throw new Error({message:'incorrent email' });
        }
        const isPassrowd = await bcrypt.compare(password, user.password)
        if(!isPassrowd){
            throw new Error({message: 'Password is incorrenct'})
        }
        
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return{
            ...tokens,
            user:userDto
        }
    }
    async logout(refreshToken){
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw new Error({message: 'User is not login' })
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenfromDb = await TokenService.findToken(refreshToken)
        if(!userData || !tokenfromDb){
            throw new Error({message: 'User is not login' })
        }
        const user = await User.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return{
            ...tokens,
            user:userDto
        }
    }

}

module.exports = new UserService()