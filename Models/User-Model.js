const mongooose=require('mongoose');
const Schema=mongooose.Schema

const UserSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    registered_date:{
        type:Date,
        default:Date.now
    }
})
module.exports=User=mongooose.model('user',UserSchema);