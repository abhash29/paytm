import mongoose from 'mongoose';
export const connectDb = ( () =>{
    try{
        mongoose.connect('mongodb+srv://abhash29:Abhash%406685@cluster0.07ms2qn.mongodb.net/paytm');
        console.log("Mongodb is connected");
    }
    catch(err){
        console.log(err);
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
});

export const User = mongoose.model("User", userSchema);