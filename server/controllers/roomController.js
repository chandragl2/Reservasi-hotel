const RoomType = require('../models/RoomType');
const Room = require('../models/Room');

// @desc    Get all room types
// @route   GET /api/rooms/types
// @access  Public
const getRoomTypes = async (req, res) => {
    try {
        const roomTypes = await RoomType.find({});
        res.json(roomTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a room type
// @route   POST /api/rooms/types
// @access  Private/Admin
const createRoomType = async (req, res) => {
    try {
        const { typeName, price, facilities, description } = req.body;
        const roomType = new RoomType({ typeName, price, facilities, description });
        const createdType = await roomType.save();
        res.status(201).json(createdType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({}).populate('roomType');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res) => {
    try {
        const { roomNumber, roomType } = req.body;
        const room = new Room({ roomNumber, roomType });
        const createdRoom = await room.save();
        res.status(201).json(createdRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getRoomTypes,
    createRoomType,
    getRooms,
    createRoom
};
