const mongoose = require("mongoose")
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://abdulrehmanabid234:Abc12345@cluster0.k5xuhel.mongodb.net/test")
        console.log(`mongo db connected at ${conn.connection.host}` );
    } catch (error) {
        console.log(error);
        process.exit(1) 
    }
}
module.exports = connectDB