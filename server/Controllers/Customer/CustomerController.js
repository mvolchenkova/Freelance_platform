const {User, Token} = require('../../models/models');
const UserDto = require('../../dto/UserDto')
const { Op } = require('sequelize');
const TokenService = require('../../service/tokenService')
const {validationResult, body} = require('express-validator')
const UserService = require('../../service/userService');
const userService = require('../../service/userService');
class UserController{
    async getUsers(req,res){
        const { page = 1, limit = 10, search = ''} = req.query;
        const offset = (page - 1) * limit;
        const where ={}
        
        if(search){
            where[Op.or]= [
                {login:{[Op.like]: `%${search}%`}},
                {name:{[Op.like]: `%${search}%`}},
                {role:{[Op.like]: `%${search}%`}}

            ]
        }
        const users = await User.findAndCountAll({
            where,
            limit,
            offset,
           
        });
        return res.json({
            total:users.count,
            pages: Math.ceil(users.count / limit),
            data: users.rows
        })
    }
    async getById(req,res){
        try{
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: "Unauthorized: Token not provided" });
            }
            const tokenData = await Token.findOne({
                where:{
                    refreshToken: token
                }
            })
            if (!tokenData) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            const user = User.findByPk(tokenData.idUser);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
           
            return res.json(user);
        }catch(error){
            return res.status(500).json({message: "Request is not correctly: ", error})
        }
    }
    async updateUser(req, res){
        const {id} = req.params;
        const {name, age, nationality} = req.body;
        try{
            const user = await User.findByPk(id);
            if(!user){
                return res.status(404).json('User not found')
            }
            const userdata = await user.update({name, BirthdayDate, });
            const userDto = new UserDto(userdata)
            const tokens = TokenService.generateTokens({userDto})
            await TokenService.saveToken(userDto.id, tokens.refreshToken);
            return res.status(201).json({...tokens,user: userDto})
        }catch(error){
            return res.status(500).json('Something went wrong: '+ error)
        }
    }
    async blockUser(req,res){
        const id = req.params.id;
        try{
            const user = await User.findByPk(id);
            if(!user){
                return res.status(404).json('User not found')
            }
            await user.update({
                isBlocked: !user.isBlocked
            });
            return res.status(201).json({message: `User is blocked`})
        }catch(error){
            return res.status(500).json('Something went wrong')
        }
    }
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Validation is incorrect' });
            }
    
            const { email, password, login, name } = req.body;
            const userData = await UserService.registration(email, password, login, name);
    
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.status(200).json(userData);
        } catch (error) {
            
            console.error(error);
            return res.status(500).json({ message: `Internal server error: ${error}` });
    
            }
    }
    async logining(req,res){
        try{
            const {email, password} = req.body;   
            const userData = await userService.login(email,password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.status(200).json(userData)
        }catch(e){
            return res.status(404).json({message: e.message})
        }
    }
    async logout(req,res){
        try{
            const { refreshToken } = req.body;
            console.log(refreshToken)
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken');
            return res.status(200).json({ message: 'Successfully logged out' });
        }catch(e){
            console.log(e.message)
        }
    }
    async refresh(req,res){
        try{
            const refreshToken = req.cookies.refreshToken;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken,{maxAge:10*24*60*60*1000, httpOnly:true})
            return res.json(userData)
        }catch(e){
            
        }
    }
}
module.exports = new UserController()