const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
whoWeAre:{
    type:String,
    default:""
},
whoWeAreImage:{
    type:String,
    default:""
},
mission:{
    type:String,
    default:""
},
missionImage:{
    type:String,
    default:""
},
vision:{
    type:String,
    default:""
},
visionImage:{
    type:String,
    default:""
},
history:{
    type:String,
    default:""
},
leaderShip:{
    type:String,
    default:""
},
governance:{
    type:String,
    default:""
}

},
{ timestamps: true }
)
module.exports = mongoose.model("about", aboutUsSchema);
