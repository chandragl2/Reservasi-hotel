const mongoose = require('mongoose');

const RoomTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    facilities: [String],
    images: [String],
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('RoomType', RoomTypeSchema);
