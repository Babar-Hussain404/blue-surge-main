const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
firstName:{
    type:String,
    default:""
},
lastName:{
    type:String,
    default:""
},
email:{
    type:String,
    default:""
},
companyName:{
    type:String,
    default:""
},
street:{
    type:String,
    default:""
},
country:{
    type:String,
    default:""
},
postalCode:{
    type:String,
    default:""
},
city:{
    type:String,
    default:""
},
phone:{
    type:String,
    default:""
},
message:{
    type:String,
    default:""
}

},
{ timestamps: true }
)
module.exports = mongoose.model("contact", contactUsSchema);
