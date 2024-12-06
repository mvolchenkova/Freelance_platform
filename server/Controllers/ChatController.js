const {Chat} = require('../models/models')
class ChatController{
    async getChats(req, res){
        const {sortBy = 'idChat', order = 'ASC'} = req.query;
        const chat = await Chat.findAndCountAll({
            order: [[sortBy,order]]
        });
        return res.json({
            data: chat.rows
        })
    }
    async getChatUser(req,res){
        try{

            const {id} = req.params
            const chats = await Chat.findAll({
                where:{
                    CustomerIdCustomer: id
                }
            })
            if(!chats){
                return res.status(404).json('User dont have chats')
            }
            return res.status(200).json(chats)
        }catch(error){
            return res.status(500).json('Interna; server error')
        }
    }
    async deleteChat(req,res){
        const {id} = req.params
        const {idUser} = req.body

        try{
            const chat = await Chat.findByPk(id)
            if(!chat){
                return res.status(404).json('chat no found')
            }
            chat.destroy()
            return res.status(201).json('Chat is deleted')
        }catch(error){
            return res.status(500).json('Interna; server error')
        }
    }
}

module.exports = new ChatController();