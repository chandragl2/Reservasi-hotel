const Reservation = require('../models/Reservation');

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}).populate('user', 'name email').populate('room');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Private
const createReservation = async (req, res) => {
    try {
        const { user, room, checkInDate, checkOutDate, totalPrice } = req.body;

        const reservation = new Reservation({
            user,
            room,
            checkInDate,
            checkOutDate,
            totalPrice
        });

        const createdReservation = await reservation.save();
        res.status(201).json(createdReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getReservations,
    createReservation
};
