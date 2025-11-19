import mongoose, { Mongoose } from "mongoose";

const tagsSchema = new mongoose.Schema({
    title : {
        type : String,
    }
})

const Tags = mongoose.model("Tags",tagsSchema);

export default Tags;    