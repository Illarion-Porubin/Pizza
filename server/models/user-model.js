const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    isActivated: {type: Boolean, default: false},
    name: {type: String, require: true},
    phone: {type: String, require: true},
    publicId: {type: String, require: false, default: ""},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    color: {type: String, default: 'black'},
    admin: {type: Boolean, default: false},
    activationLink: {type: String},
})

module.exports = model('User', UserSchema);