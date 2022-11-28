const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String, require: true,},
    phone: {type: String, require: true,},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    admin: {type: Boolean, default: false},
    activationLink: {type: String},
    cart: {type: Array, default: []},
})

module.exports = model('User', UserSchema);
