const mongoose = require('mongoose'); //Importa a biblioteca do banco

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true, //Toda vez que um SpotSchema for convertido para JSON ele levará junto os SpotSchemas virtuais
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://{your_ip}:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);