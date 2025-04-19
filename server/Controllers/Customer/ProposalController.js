const {Proposal, User} = require('../../models/models');
class ProposalController {
    async getProposal(req, res){
        const { sortBy = 'idProposal', order = 'ASC', filter = {} } = req.query;
        const where = {}

        for(const key in filter){
            if(filter.hasOwnProperty(key)){
                where[key] = filter[key];
            }
        }
        const proposal = await Proposal.findAndCountAll({
            where,
            order: [[sortBy,order]]
        });
            
        
        return res.json({
            total: proposal.count,
            data: proposal.rows
        })
    }
    async createProposal(req,res){
        const {description,isPublished,cost,skills,title,id} = req.body;
        try{
            const user = await User.findByPk(id);
            const proposal = await Proposal.create({
                description: description,
                UserIdUser: id,
                cost,
                skills,
                title,
                isPublished,
            })
            const userInf = {
                id: user.id,
                email: user.email,
                login: user.login,
            }
            return res.status(200).json({proposal,userInf})
        }catch(error){
            console.error(error)
            return res.status(500).json('Internal server error '+error)
        }
    }
    async getProposalbyUserId(req,res){
        const {id} = req.params;
        try{
            const proposals = await Proposal.findAll({
                where:{
                    UserIdUser: id
                }
            })
            return res.status(200).json(proposals)
        } catch (error){
            console.error(error)
            return res.status(500).json('Internal server error '+error)
        }
    }
    async deleteProposal(req,res){
        const {id} = req.params;
        try{
            const proposal = await Proposal.findByPk(id)
            if(!proposal){
                return res.status(404).json('proposal is not found')
            }
            proposal.destroy();
            return res.status(201).json('data is deleted');
        }catch(error){
            console.log(error)
            return res.status(500).json(error)
        }
    }
    async PublishProposal(req,res){
        const {id} = req.params
        const {isPublished} = req.body
        try{
            const proposal = await Proposal.findByPk(id)
            if(!proposal){
                return res.status(404).json('Proposal not found')
            }
            const response = await proposal.update({
                isPublished: isPublished
            })
            return res.status(201).json({message:`Proposal updated ${response}`})
        }catch(error){
            console.error(error)
            return res.status(500).json('Internal server error')
        }
    }
}
module.exports = new ProposalController();