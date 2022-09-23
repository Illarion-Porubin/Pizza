module.exports = class UserDto {
    name;
    email;
    id;
    isActivated;

    constructor(model) {
        this.name = model.name;
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}
