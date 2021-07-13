const mongoose = require('mongoose');

const GPUSchema = new mongoose.Schema({
    customID: {
        type:String,
        require: true,
        unique: true
    },
    name: {
        type:String,
        required: true
    },
    url: {
        type:String,
        default:''
    },
    price_upper: {
        type:Number,
        default: 0
    },
    description: {
        type:String,
        default: ''
    }
}, {timestamps: true});

const GPU_INFO = mongoose.model('GPU_INFO', GPUSchema);

module.exports = GPU_INFO;