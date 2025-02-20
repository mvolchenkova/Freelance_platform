const { DataTypes, DatabaseError } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    userId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    userName: { type: DataTypes.TEXT, allowNull:false },
    surname: { type: DataTypes.TEXT, allowNull:false },
    phone: { type: DataTypes.TEXT, allowNull:false },
    password: { type: DataTypes.TEXT, allowNull:false },
    email: { type: DataTypes.TEXT, allowNull:false },
    profilePicture: { type: DataTypes.TEXT, allowNull:false },
    birthDate: { type: DataTypes.DATE, allowNull:false },
    role: { type: DataTypes.TEXT, allowNull:false},
    rating: { type: DataTypes.DOUBLE }
},{
    tableName: 'users'
})


const Portfolio = sequelize.define('portfolio', {
    portfolioId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    workExperience: { type: DataTypes.INTEGER }
},{
    tableName: 'portfolios'
})


const Task = sequelize.define('task',{
    taskId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    title: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    payment: { type: DataTypes.DOUBLE, allowNull: false },
    deadline: { type: DataTypes.DATE, allowNull: false },
    taskStatus: { type: DataTypes.TEXT, allowNull: false }
},{
    tableName: 'tasks'
})


const Response = sequelize.define('response',{
    responseId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    responseStatus: { type: DataTypes.TEXT, allowNull: false },
    proposal: { type: DataTypes.TEXT, allowNull: true },
    submissionDate: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.BIGINT, allowNull: false }
},{
    tableName: 'responses'
})


const AdditionalService = sequelize.define('additionalService',{
    serviceId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    serviceName: { type:DataTypes.TEXT, allowNull: false },
    description: { type:DataTypes.TEXT, allowNull: false },
    price: { type:DataTypes.DOUBLE, allowNull: false }
},{
    tableName: 'additionalServices'
})


const Balance = sequelize.define('balance',{
    balanceId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    current: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
    userId: { type: DataTypes.BIGINT, allowNull: false }
},{
    tableName: 'balances'
})


const Deal = sequelize.define('deal',{
    dealId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
},{
    tableName: 'deals'
})


const Review = sequelize.define('review',{
    reviewId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: true },
    reviewDate: { type: DataTypes.DATE, allowNull: false }
},{
    tableName: 'reviews'
})


const SkillAssessment = sequelize.define('skillAssessment',{
    assessmentId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    score: { type: DataTypes.INTEGER, allowNull: false }, 
    assessmentDate: { type: DataTypes.DATE, allowNull: false }
},{
    tableName: 'skillAssessments'
})


const Category = sequelize.define('category',{
    categoryId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    categoryName: { type: DataTypes.TEXT, allowNull: false }
},{
    tableName: 'categories'
})


const Skill = sequelize.define('skill',{
    skillId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    skillName: { type: DataTypes.TEXT, allowNull: false }
},{
    tableName: 'skills'
})


const Project = sequelize.define('project',{
    projectId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    title: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false }
},{
    tableName: 'projects'
})


const Language = sequelize.define('language',{
    languageId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    langName: { type: DataTypes.TEXT, allowNull: false },
    proficiencyLevel: { type: DataTypes.TEXT, allowNull: false }
},{
    tableName: 'languages'
})


const Transaction = sequelize.define('transaction',{
    transactionId: { type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true },
    amount: { type: DataTypes.DOUBLE, allowNull: false },
    transactionDate: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.BIGINT, allowNull: false }
},{
    tableName: 'transactions'
})

// freelancer-response 1:M
User.hasMany(Response, { foreignKey: 'userId', as: 'responses' })
Response.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// freelancer-portfolio 1:1
User.hasOne(Portfolio, { foreignKey: 'userId', as: 'portfolio' })
Portfolio.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// freelancer-balance 1:1
User.hasOne(Balance, { foreignKey: 'userId', as: 'balance' })
Balance.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// freelancer-transaction 1:M
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transaction' })
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// transaction-deal 1:M
// freelancer-project 1:M
// freelancer-review 1:M
// skill-skillAssessment 1:M
// task-review 1:M


module.exports = { User, Portfolio, Task, Response, AdditionalService, Balance, Deal, 
    Review, SkillAssessment, Category, Skill, Project, Language, Transaction }