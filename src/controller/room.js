const room=[];

const getRooms=(req,res)=>{
          
       res.status(200).send({
           message:"get room sucessfull",
           room
       })
}
 
const createRooms=(req,res)=>{
       try {
            let roomID= room.find((roomItem)=>roomItem.room_ID === req.body.room_ID)
         if(!roomID){
            let createRoom={
                  roomName: req.body.roomName,
                  room_ID: req.body.room_ID,
                  available_Seats: req.body.available_Seats,
                  amenities:req.body.amenities,
                  priceperhour: req.body.priceperhour,
                  bookings: []
                }
             room.push(createRoom)
             res.status(201).send({
                message:"room create sucessfully",
                room: createRoom
               
           })
       }
       else{
              res.status(400).send({
                   message:"Room with the same ID already exists"
            })
       }
       } catch (error) {
            console.log(error.message);
            res.status(500).send({
                  message:"Internel server Error"
            })
       }
      
       
}

const bookingRoom =(req,res)=>{
         try {
            let roomID= room.find((roomItem)=>roomItem.room_ID === req.body.room_ID)
            if(roomID){
                   room.forEach((roomItem,i)=>{
                        if(roomItem.room_ID===req.body.room_ID){
                              const uniqueBookingID = Date.now().toString();
                              const newBooking= {
                                    customerName:req.body.customerName,
                                    date: req.body.date,
                                    startTime:req.body.startTime,
                                    endTime:req.body.endTime,
                                    bookedStatus:"Registered",
                                    bookedID:uniqueBookingID,
                                    bookedDate: new Date()
                              }
                              roomItem.bookings.push(newBooking)
                        }
                 })
                  res.status(201).send({
                        message:"Room booked sucessfully",
                        bookings:roomID.bookings
                  })
                 
            }
            else{
                 res.status(400).send({
                      message:"Invalid Room ID"
                 })
            }
         } catch (error) {
              console.log(error.message);
              res.status(500).send({
                   message:"Internal Server Error"
              })
         }
           
  }

  const bookedRoomDetails=(req,res)=>{
      
         try {
            let bookedRooms=[];

            room.map((roomItem)=>{
   
                   roomItem.bookings.map((booking)=>{
                       if(booking.bookedStatus==="Registered"){
                            const bookedRoom ={
                                 roomName:roomItem.roomName,
                                 bookedStatus:booking.bookedStatus,
                                 customerName:booking.customerName,
                                 date:booking.date,
                                 startTime:booking.startTime,
                                 endTime:booking.endTime   
                            };
                            bookedRooms.push(bookedRoom)
                       }
                   })
            })
                   res.status(200).send({
                       message:"List All Room booked Details",
                       bookedRooms
                   })
               
         } catch (error) {
               res.status(500).send({
                   message:"Internel Server Error"
               })
         }

  }
 
  const customerBookedDetails=(req,res)=>{
          
         try {
            let customerBooked=[];

            room.map((roomItem)=>{
                  roomItem.bookings.map((booking)=>{
                         
                        if(booking.bookedStatus==="Registered"){
                            const customerBook={
                              customerName:booking.customerName,
                               roomName:roomItem.roomName,
                               date:booking.date,
                               startTime:booking.startTime,
                               endTime:booking.endTime
                                 
                            };
                            customerBooked.push(customerBook)

                        }
                  })
            })

            res.status(200).send({
                  message:"List all Customer Booked Details",
                  customerBooked
            })
            
         } catch (error) {
             res.status(500).send({
                  message:"Internel Server Error"
              })
         }
  }
  
  const customerBookingCount=(req,res)=>{
          let customercounts=[];
          let counts=0;
          let customerName=req.params.customerName;

             room.map((roomItem)=>{
                  roomItem.bookings.map((booking)=>{
                        if(booking.customerName===customerName){
                                 counts++;
                             const  customercount={
                                    customerName:booking.customerName,
                                    roomName:roomItem.roomName,
                                    date:booking.date,
                                    startTime:booking.startTime,
                                    endTime:booking.endTime,
                                    bookedID: booking.bookedID,
                                    bookedDate:booking.bookedDate,
                                    bookedStatus:booking.bookedStatus
                             }
                             customercounts.push(customercount)    
                        }
                  })
             })

             res.status(200).send({
                   message:"Customer Booking room counts",
                   counts:counts,
                   customercounts
             })
  }
  
module.exports={
      getRooms,
      createRooms,
      bookingRoom,
      bookedRoomDetails,
      customerBookedDetails,
      customerBookingCount
}
