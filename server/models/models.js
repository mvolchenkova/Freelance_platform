const {DataTypes} = require('sequelize')
const sequelize = require('../db.js');

const Customer = sequelize.define('Customer',{
    idCustomer:{type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true},
    firstname:{type:DataTypes.STRING, allowNull:false},
    lastname:{type:DataTypes.STRING, allowNull:false},
    mail:{type:DataTypes.STRING, allowNull:true},
    phone:{type:DataTypes.STRING, allowNull:true},
    birthdayDate:{type:DataTypes.DATE, allowNull:true}
})
const Support = sequelize.define('Support',{
    idSupport:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement:true},
    answer:{type:DataTypes.STRING,allowNull: true},
    question:{type:DataTypes.STRING, allowNull: false},
    timeOfAnswer:{type:DataTypes.DATE, allowNull:true},
    timeOfAsk:{type:DataTypes.DATE,allowNull:false}
})
const Stat = sequelize.define('Stat',{
    idStat:{type:DataTypes.BIGINT,primaryKey:true},
    information:{type:DataTypes.STRING, allowNull:true},
    countOfCompletedProposal:{type:DataTypes.INTEGER,allowNull:false}
})
const SavedFreelancer = sequelize.define('SavedFreelancer',{
    idSavedFreelancers:{type:DataTypes.BIGINT, primaryKey:true},
    idCustomer:{type:DataTypes.BIGINT}
})
const Request = sequelize.define('Request',{
    idRequest:{type:DataTypes.BIGINT, primaryKey:true},
    description:{type:DataTypes.STRING,allowNull:false},
    idFreelancer:{type:DataTypes.BIGINT, allowNull:false}
})
const Transaction = sequelize.define('Transaction',{
    idTransaction:{rtpe:DataTypes.BIGINT, primaryKey:true},
    cost:{type:DataTypes.DOUBLE, allowNull:false},
    isComplete:{type:DataTypes.BOOLEAN, allowNull:false},
    idFreelancer:{type:DataTypes.BIGINT, allowNull:false}
})
const Chat = sequelize.define('Chat',{
    idChat:{type:DataTypes.BIGINT, primaryKey:true},
    chat:{type:DataTypes.STRING, allowNull:true},
    idFreelancer:{type:DataTypes.BIGINT, allowNull:false}
})
const Vacancie = sequelize.define('Vacancie',{
    idVacancie:{type:DataTypes.BIGINT, primaryKey:true},
    description:{type:DataTypes.STRING, allowNull:false,
    skills:{type:DataTypes.STRING}
    }
})
const Proposal = sequelize.define('Proposal',{
    idProposal:{type:DataTypes.BIGINT, primaryKey:true},
    description:{type:DataTypes.STRING,allowNull:false},
    isPublished:{type:DataTypes.BOOLEAN, allowNull:false},
})
const Category = sequelize.define('Proposal',{
    idCategory:{type:DataTypes.BIGINT,primaryKey:true},
    nameOfCategory:{type:DataTypes.STRING,allowNull:false}
})



Customer.hasMany(Support);
Support.belongsTo(Customer);

Customer.hasOne(Stat);
Stat.belongsTo(Customer);

Stat.hasMany(SavedFreelancer);
SavedFreelancer.belongsTo(Stat);

Customer.hasMany(Request);
Request.belongsTo(Customer);

Customer.hasOne(Transaction);
Transaction.belongsTo(Customer);

Customer.hasMany(Chat);
Chat.belongsTo(Customer);

Customer.hasMany(Vacancie);
Vacancie.belongsTo(Customer);

Customer.hasMany(Proposal);
Proposal.belongsTo(Customer);

Category.hasMany(Proposal);
Proposal.belongsTo(Category);

module.exports = {Customer, Support, Stat, SavedFreelancer, Request, Transaction, Chat, Vacancie, Proposal, Category}
