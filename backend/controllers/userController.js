import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// user login
const userLogin = async(req, res) => {
    const {email, password} = req.body;
    try {
        const userExist = await userModel.findOne({email});
        if(!userExist){
            return res.json({success:false, message:"user doesn't exist"});
        }

        const isVerified = await bcrypt.compare(password, userExist.password);

        if(!isVerified){
            return res.json({success:false, message:"Invalid credentials"});
        }

        const token = createToken(userExist._id);
        res.json({success:true, token});
    } catch (error) {
        res.json({success:false, message:"Error"});
    }
    
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
// user register
const userRegister = async(req, res) => {


    const{name, email, password} = req.body;
    try {
        // checking if user already exist
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success:false, message: "user already exist"});
        }

        // validating email and strong password.
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false, message: "Please enter a strong password"})
        }
        
        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        res.json({success:false, message: "Error"})        
    }

}

export {userLogin, userRegister};