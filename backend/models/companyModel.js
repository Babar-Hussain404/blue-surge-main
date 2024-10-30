const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
companyName:{
    type:String,
    default:""
},
companyAddress:{
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
module.exports = mongoose.model("company", companySchema);
