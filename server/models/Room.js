const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'maintenance'],
        default: 'available'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', RoomSchema);
