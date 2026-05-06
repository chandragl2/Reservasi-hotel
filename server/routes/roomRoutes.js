const express = require('express');
const router = express.Router();
const { getRoomTypes, createRoomType, getRooms, createRoom } = require('../controllers/roomController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getRooms)
    .post(protect, admin, createRoom);

router.route('/types')
    .get(getRoomTypes)
    .post(protect, admin, createRoomType);

module.exports = router;
