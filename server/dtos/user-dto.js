module.exports = class UserDto {
    name;
    email;
    phone;
    id;
    isActivated;

    constructor(model) {
        this.name = model.name;
        this.phone = model.phone;
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}
