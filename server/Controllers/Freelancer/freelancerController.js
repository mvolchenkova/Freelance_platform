const { User, Portfolio, Skill } = require('../../models/models');
const { Op } = require('sequelize');

const formatRegisterDate = (date) => {
  if (!date) return '0y 0m';
  const now = new Date();
  const created = new Date(date);
  const diffDays = Math.ceil((now - created) / (1000 * 60 * 60 * 24));
  return `${Math.floor(diffDays / 365)}y ${Math.floor((diffDays % 365) / 30)}m`;
};

const calculateRate = (experience) => {
  return (50000 + (experience * 10000)).toLocaleString('en-US');
};
class FreelancerController {
    async getFreelancers(req, res) {
        try {
          const freelancers = await User.findAll({
            where: {
              role: 'freelancer',
              isBlocked: false
            },
            attributes: ['idUser', 'name', 'email','createdAt']
          });
          
          res.json(freelancers);
        } catch (error) {
          console.error('Database error:', error);
          res.status(500).json({ error: 'Database error', details: error.message });
        }};

async getFreelancerById(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  
      const freelancer = await User.findOne({
        where: { idUser: id, role: 'freelancer' },
        include: [
          { model: Portfolio, attributes: ['workExperience', 'education', 'about'] },
          { model: Skill, through: { attributes: [] }, attributes: ['skillName'] }
        ],
        attributes: ['idUser', 'name', 'email', 'img', 'skills', 'phone', 'createdAt']
      });
  
      if (!freelancer) return res.status(404).json({ error: 'Freelancer not found' });
  
      res.json({
        id: freelancer.idUser,
        name: freelancer.name,
        email: freelancer.email,
        avatarUrl: freelancer.img || '/default-avatar.jpg',
        skills: freelancer.skills || [],
        workExperience: freelancer.Portfolio?.workExperience || 4,
        education: freelancer.Portfolio?.education || 'Not specified',
        RegisterDate: formatRegisterDate(freelancer.createdAt),
        payment: calculateRate(freelancer.Portfolio?.workExperience || 0),
        smallDesc: `Freelancer. ${freelancer.Portfolio?.workExperience || 0} years experience`,
        location: 'Remote',
        phone: freelancer.phone,
        about: freelancer.Portfolio?.about || ''
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }};
module.exports = new FreelancerController();