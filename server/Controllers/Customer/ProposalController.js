const {Proposal} = require('../../models/models');
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
        const {id} = req.params
        const {description,isPublished} = req.body

        try{
            const proposal = await Proposal.create({
                description: description,
                isPublished: isPublished,
                CustomerIdCustomer: id
            })
            return res.status(200).json(proposal)
        }catch(error){
            return res.status(500).json('Internal server error '+error)
        }
    }
    async deleteProposal(req,res){
        const {id} = req.params
        try{
            const proposal = await Proposal.findByPk(id)
            if(!proposal){
                return res.status(404).json('vacancie is not found')
            }
            proposal.destroy();
            return res.status(201).json('data is deleted');
        }catch(error){
            return res.status(500).json('Interna; server error')
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
            await proposal.update({
                isPublished: isPublished
            })
            return res.status(201).json('Proposal updated')
        }catch(error){
            return res.status(500).json('Internal server error')
        }
    }
}
module.exports = new ProposalController();