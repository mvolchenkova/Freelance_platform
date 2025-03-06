const {DataTypes} = require('sequelize')
const sequelize = require('../db.js');

const User = sequelize.define('User',{
    idUser:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement: true},
    email:{type:DataTypes.CHAR(50), allowNull:false},
    login:{type:DataTypes.CHAR(50), allowNull:false},
    password:{type:DataTypes.STRING, allowNull:false},
    name:{type:DataTypes.CHAR(50), allowNull:true},
    isBlocked:{type:DataTypes.BOOLEAN, allowNull:false},
    phone:{type:DataTypes.STRING, allowNull:true},
    role:{type:DataTypes.CHAR(50), allowNull:false}
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
    idFreelancer:{type:DataTypes.BIGINT}
})
const Request = sequelize.define('Request',{
    idRequest:{type:DataTypes.BIGINT, primaryKey:true},
    description:{type:DataTypes.STRING,allowNull:false},
    idFreelancer:{type:DataTypes.BIGINT, allowNull:false}
})
const Transaction = sequelize.define('Transaction',{
    idTransaction:{type:DataTypes.BIGINT, primaryKey:true},
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
    idVacancie:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement:true},
    description:{type:DataTypes.STRING, allowNull:false},
    skills:{type:DataTypes.STRING}
    }
)
const Proposal = sequelize.define('Proposal',{
    idProposal:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement:true},
    description:{type:DataTypes.STRING,allowNull:false},
    isPublished:{type:DataTypes.BOOLEAN, allowNull:false},
})
const Category = sequelize.define('Category',{
    idCategory:{type:DataTypes.BIGINT,primaryKey:true},
    nameOfCategory:{type:DataTypes.STRING,allowNull:false}
})
const Token = sequelize.define('Token',{
    idToken:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement:true},
    refreshToken:{type:DataTypes.STRING(1024)},
    idUser:{type:DataTypes.BIGINT,}
})



User.hasMany(Support);
Support.belongsTo(User);

User.hasOne(Stat);
Stat.belongsTo(User);

Stat.hasMany(SavedFreelancer);
SavedFreelancer.belongsTo(Stat);

User.hasMany(Request);
Request.belongsTo(User);

User.hasOne(Transaction);
Transaction.belongsTo(User);

User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(Vacancie);
Vacancie.belongsTo(User);

User.hasMany(Proposal);
Proposal.belongsTo(User);

Category.hasMany(Proposal);
Proposal.belongsTo(Category);

module.exports =  {User, Support, Stat, SavedFreelancer, Request,
     Transaction, Chat, Vacancie, Proposal, Category,Token
}
