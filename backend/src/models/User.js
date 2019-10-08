const mongoose = require('mongoose'); //Importa a biblioteca do banco

const UserSchema = new mongoose.Schema ({
    email: String
});

module.exports = mongoose.model('User', UserSchema);