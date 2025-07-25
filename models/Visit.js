const mongoose = require('mongoose')
const visitSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    rating:
    {
        type: Number,
    },
    visitType: {
        type: String,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
    },
    dateIn: {
        type: Date,
    },
    dateOut: {
        type: Date,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }

})
const Visit = mongoose.model('Visit', visitSchema)
module.exports = Visit;