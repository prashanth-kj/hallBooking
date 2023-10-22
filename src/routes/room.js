const express=require('express');
const router =express.Router();
const RoomsController=require('../controller/room')
 
 router.get('/',RoomsController.getRooms)
 router.post('/create',RoomsController.createRooms)
 router.post('/bookingroom',RoomsController.bookingRoom)
 router.get('/room-with-booked',RoomsController.bookedRoomDetails)
 router.get('/customer-with-booked',RoomsController.customerBookedDetails)
 router.get('/customer-book-counts/:customerName',RoomsController.customerBookingCount)

module.exports=router;