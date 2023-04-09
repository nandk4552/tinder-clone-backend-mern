import mongoose from "mongoose";


export const cardSchema = mongoose.Schema({
    name: String,
    imgUrl: String,
})

export default mongoose.model('Card', cardSchema);
