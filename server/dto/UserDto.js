module.exports = class UserDto{
    email; id; login; name;phone; role;isBlocked;
    constructor(model){
        this.email = model.email;
        this.id = model.idUser;
        this.login = model.login;
        this.name = model.name;
        this.phone = model.phone;
        this.role = model.role;
        this.isBlocked = model.isBlocked;
    }
}