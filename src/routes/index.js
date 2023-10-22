const express=require('express')
const router=express.Router()

const RoomRoutes=require('./room')

router.use('/room',RoomRoutes)

module.exports=router;