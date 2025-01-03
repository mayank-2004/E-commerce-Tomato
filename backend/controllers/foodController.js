import foodModel from "../models/foodModel.js";
import fs from "fs"

// add Foot item
const addFood = async(req, res) => {
    let image_name = `${req.file.filename}`;    // getting the file name and saving it in image_name

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_name,
    })

    try {
        await food.save();
        res.json({success: true, message: "food added"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "error"})
    }
}

// all food list
const listFood = async(req, res) => {
    try {
        const food = await foodModel.find({});
        res.json({success:true, data: food});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "error"});
    }
}

// remove food item
const removeFood = async(req, res) => {
    try {
        const item = await foodModel.findById(req.body.id);
        // console.log(item);
        fs.unlink(`uploads/${item.image}`, ()=> {})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food removed"});
    } catch (error) {
        console.log("error");
        res.json({success:false, message: "error"});
    }
}

export {addFood, listFood, removeFood};