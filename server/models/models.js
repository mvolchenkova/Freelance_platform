const {DataTypes} = require('sequelize')
const sequelize = require('../db.js');

const User = sequelize.define('User',{
    idUser:{type:DataTypes.BIGINT,primaryKey:true, autoIncrement:true},
    firstname:{type:DataTypes.STRING, allowNull:false},
    lastname:{type:DataTypes.STRING, allowNull:false},
    email:{type:DataTypes.STRING, allowNull:true},
    phone:{type:DataTypes.STRING, allowNull:true},
    birthdayDate:{type:DataTypes.DATE, allowNull:true},
    role:{type:DataTypes.STRING,allowNull:false}
})
const Category = sequelize.define('Category',{
    idCategory:{type:DataTypes.BIGINT,primaryKey:true},
    nameOfCategory:{type:DataTypes.STRING,allowNull:false}
})
const Report = sequelize.define('Report',{
    idReport:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement:true},
    Reason:{type:DataTypes.STRING,allowNull:false},
    idReportedUser:{type:DataTypes.BIGINT,allowNull: false},
    idReportedByUser :{type:DataTypes.BIGINT, allowNull: false},
    Status:{type:DataTypes.STRING, allowNull:false},
    idAdmin:{type:DataTypes.BIGINT,allowNull:false},
    idDeal:{type:DataTypes.BIGINT,allowNull:true}
})
const Support = sequelize.define('Support',{
    idSupport:{type:DataTypes.BIGINT, primaryKey:true, autoIncrement:true},
    answer:{type:DataTypes.STRING,allowNull: true},
    question:{type:DataTypes.STRING, allowNull: false},
    timeOfAnswer:{type:DataTypes.DATE, allowNull:true},
    timeOfAsk:{type:DataTypes.DATE,allowNull:false}
})
const BannedUser = sequelize.define('BannedUser',{
    idUser:{type:DataTypes.BIGINT,primaryKey:true},
    Reason:{type:DataTypes.STRING, allowNull:true},
    idAdmin:{type:DataTypes.BIGINT,allowNull:false}
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
    idUser:{type:DataTypes.BIGINT, allowNull:false}
})
const Fine = sequelize.define('Fine',{
    idFine:{type:DataTypes.BIGINT, primaryKey:true},
    idUser:{type:DataTypes.BIGINT, allowNull:false},
    Reason:{type:DataTypes.STRING, allowNull:false},
    Cost:{type:DataTypes.DECIMAL, allowNull:false}
})
const Deal = sequelize.define('Deal',{
    idDeal:{type:DataTypes.BIGINT, primaryKey:true},
    idTask:{type:DataTypes.BIGINT, allowNull:false},
    idCustomer:{type:DataTypes.BIGINT, allowNull:false},
    idFreelancer:{type:DataTypes.BIGINT, allowNull:false},
    StartDate:{type:DataTypes.DATE, allowNull:false},
    EndDate:{type:DataTypes.DATE,allowNull:true}
})





User.hasMany(Fine);
Fine.belongsTo(User);

User.hasOne(BannedUser);
BannedUser.belongsTo(User); 

Report.hasOne(Deal);
Deal.belongsTo(Report);

User.hasMany(Report);
Report.belongsTo(User);

User.hasOne(Transaction);
Transaction.belongsTo(User);

module.exports =  {User, Support, Report, BannedUser, Transaction, Chat, Fine, Deal, Category}
