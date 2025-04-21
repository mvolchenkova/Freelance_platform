module.exports = class UserDto {
  email;
  id;
  login;
  name;
  phone;
  role;
  isBlocked;
  img;
  skills;
  location;
  description;
  salary;
  createdAt;
  addServices;
  constructor(model) {
    this.email = model.email;
    this.id = model.idUser;
    this.login = model.login;
    this.name = model.name;
    this.phone = model.phone;
    this.role = model.role;
    this.isBlocked = model.isBlocked;
    this.img = model.img;
    this.skills = model.skills;
    this.createdAt = model.createdAt;
    this.location = model.location;
    this.description = model.description;
    this.salary = model.salary;
    this.addServices = model.addServices;
  }
};
