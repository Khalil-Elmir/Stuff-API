const mongoose = require('mongoose');
// ajouter le validateur unique de mongoose ( apres l installe de package mongoose-unique-validator)
// npm install --save mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

const userSchema =  mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

// passer unique validator au schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);