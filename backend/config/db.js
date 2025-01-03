import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect("mongodb+srv://mayankrathore:Food-delivery@cluster0.ejebz.mongodb.net/Food-delivery?retryWrites=true&w=majority&appName=Cluster0").then(() => {
        console.log("database connected.");
    })
}