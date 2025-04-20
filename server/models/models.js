const { DataTypes, STRING } = require("sequelize");
const sequelize = require("../db");
const User = sequelize.define("User", {
  idUser: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  login: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true },
  name: { type: DataTypes.STRING, allowNull: true },
  skills: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  isBlocked: { type: DataTypes.BOOLEAN, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, allowNull: false },
});
const UserInformation = sequelize.define("UserInformation", {
  idUserInformation: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  location: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  salary: { type: DataTypes.DECIMAL, allowNull: true },
  idUser: { type: DataTypes.BIGINT, allowNull: false },
});
const Support = sequelize.define("Support", {
  idSupport: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  answer: { type: DataTypes.STRING, allowNull: true },
  question: { type: DataTypes.STRING, allowNull: false },
  timeOfAnswer: { type: DataTypes.DATE, allowNull: true },
  timeOfAsk: { type: DataTypes.DATE, allowNull: false },
});
//подумать
const Stat = sequelize.define("Stat", {
  idStat: { type: DataTypes.BIGINT, primaryKey: true },
  information: { type: DataTypes.STRING, allowNull: true },
  countOfCompletedProposal: { type: DataTypes.INTEGER, allowNull: false },
});
const SavedFreelancer = sequelize.define("SavedFreelancer", {
  idSavedFreelancers: { type: DataTypes.BIGINT, primaryKey: true },
  idFreelancer: { type: DataTypes.BIGINT },
});
const Request = sequelize.define("Request", {
  idRequest: { type: DataTypes.BIGINT, primaryKey: true },
  description: { type: DataTypes.STRING, allowNull: false },
  idFreelancer: { type: DataTypes.BIGINT, allowNull: false },
});
const Transaction = sequelize.define("Transaction", {
  idTransaction: { type: DataTypes.BIGINT, primaryKey: true },
  cost: { type: DataTypes.DOUBLE, allowNull: false },
  isComplete: { type: DataTypes.BOOLEAN, allowNull: false },
  idFreelancer: { type: DataTypes.BIGINT, allowNull: false },
});
const Chat = sequelize.define("Chat", {
  idChat: { type: DataTypes.BIGINT, primaryKey: true },
  chat: { type: DataTypes.STRING, allowNull: true },
  idFreelancer: { type: DataTypes.BIGINT, allowNull: false },
});
const Vacancie = sequelize.define("Vacancie", {
  idVacancie: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
  title: { type:DataTypes.STRING, allowNull:false },
  salary: {type:DataTypes.DECIMAL, allowNull: false},
  skills: { type: DataTypes.STRING, allowNull:false},
  isPublished: { type: DataTypes.BOOLEAN, allowNull: false },
});
const Proposal = sequelize.define("Proposal", {
  idProposal: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  title: { type:DataTypes.STRING, allowNull:false },
  description: { type: DataTypes.STRING, allowNull: false },
  cost: {type:DataTypes.DECIMAL, allowNull: false},
  skills: { type: DataTypes.STRING, allowNull:false},
  isPublished: { type: DataTypes.BOOLEAN, allowNull: false },
  stage:{type: DataTypes.STRING,allowNull:false},
});
const Category = sequelize.define("Category", {
  idCategory: { type: DataTypes.BIGINT, primaryKey: true,autoIncrement:true },
  nameOfCategory: { type: DataTypes.STRING, allowNull: false },
});
const Token = sequelize.define("Token", {
  idToken: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING(1024) },
  idUser: { type: DataTypes.BIGINT },
});
const BannedUser = sequelize.define("BannedUser", {
  idUser: { type: DataTypes.BIGINT, primaryKey: true },
  Reason: { type: DataTypes.STRING, allowNull: true },
  idAdmin: { type: DataTypes.BIGINT, allowNull: false },
});
const Fine = sequelize.define("Fine", {
  idFine: { type: DataTypes.BIGINT, primaryKey: true },
  idUser: { type: DataTypes.BIGINT, allowNull: false },
  Reason: { type: DataTypes.STRING, allowNull: false },
  Cost: { type: DataTypes.DECIMAL, allowNull: false },
});
const Report = sequelize.define("Report", {
  idReport: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  Reason: { type: DataTypes.STRING, allowNull: false },
  idReportedUser: { type: DataTypes.BIGINT, allowNull: false },
  idReportedByUser: { type: DataTypes.BIGINT, allowNull: false },
  Status: { type: DataTypes.STRING, allowNull: false },
  idAdmin: { type: DataTypes.BIGINT, allowNull: false },
  idDeal: { type: DataTypes.BIGINT, allowNull: true },
});

User.hasMany(Support);
Support.belongsTo(User);

User.hasOne(UserInformation, {
  foreignKey: "idUser",
  sourceKey: "idUser",
});
UserInformation.belongsTo(User, {
  foreignKey: "idUser",
  targetKey: "idUser",
});

User.hasMany(Fine);
Fine.belongsTo(User);

User.hasOne(BannedUser);
BannedUser.belongsTo(User);

User.hasMany(Report);
Report.belongsTo(User);

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

const Portfolio = sequelize.define(
  "portfolio",
  {
    portfolioId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    workExperience: { type: DataTypes.STRING, allowNull: true },
    phone: {type: DataTypes.STRING, allowNull: true},
    skills: {type: DataTypes.STRING, allowNull: true},
    education: {type: DataTypes.STRING, allowNull:true},
    idUser: {type:DataTypes.BIGINT, allowNull: false}
  },
);

const Task = sequelize.define(
  "task",
  {
    taskId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    payment: { type: DataTypes.DOUBLE, allowNull: false },
    deadline: { type: DataTypes.DATE, allowNull: false },
    taskStatus: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "tasks",
  }
);

const Response = sequelize.define(
  "response",
  {
    responseId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    responseStatus: { type: DataTypes.TEXT, allowNull: false },
    proposal: { type: DataTypes.TEXT, allowNull: true },
    submissionDate: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    tableName: "responses",
  }
);

const AdditionalService = sequelize.define(
  "additionalService",
  {
    serviceId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceName: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DOUBLE, allowNull: false },
  },
  {
    tableName: "additionalServices",
  }
);

const Balance = sequelize.define(
  "balance",
  {
    balanceId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    current: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
    userId: { type: DataTypes.BIGINT, allowNull: false },
  },
  {
    tableName: "balances",
  }
);

const Deal = sequelize.define(
  "deal",
  {
    dealId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "deals",
  }
);

const Review = sequelize.define(
  "review",
  {
    reviewId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: true },
    reviewDate: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "reviews",
  }
);

const SkillAssessment = sequelize.define(
  "skillAssessment",
  {
    assessmentId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    score: { type: DataTypes.INTEGER, allowNull: false },
    assessmentDate: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "skillAssessments",
  }
);
//бесполезная таблица
const Skill = sequelize.define(
  "skill",
  {
    skillId: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    skillName: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "skills",
  }
);

const Project = sequelize.define(
  "project",
  {
    projectId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "projects",
  }
);

const Language = sequelize.define(
  "language",
  {
    languageId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    langName: { type: DataTypes.TEXT, allowNull: false },
    proficiencyLevel: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "languages",
  }
);

// freelancer-response 1:M
User.hasMany(Response, { foreignKey: "userId", as: "responses" });
Response.belongsTo(User, { foreignKey: "userId", as: "user" });

// freelancer-balance 1:1
User.hasOne(Balance, { foreignKey: "userId", as: "balance" });
Balance.belongsTo(User, { foreignKey: "userId", as: "user" });

// freelancer-transaction 1:M
User.hasMany(Transaction, { foreignKey: "userId", as: "transaction" });
Transaction.belongsTo(User, { foreignKey: "userId", as: "user" });

// transaction-deal 1:M
// freelancer-project 1:M
// freelancer-review 1:M
// skill-skillAssessment 1:M
// task-review 1:M
  
module.exports = {
  User,
  Support,
  Stat,
  SavedFreelancer,
  Request,
  Transaction,
  Chat,
  Vacancie,
  Proposal,
  Category,
  Token,
  UserInformation,
  Portfolio,
  Task,
  Response,
  AdditionalService,
  Balance,
  Deal,
  Review,
  SkillAssessment,
  Category,
  Skill,
  Project,
  Language,
  Transaction,
};
