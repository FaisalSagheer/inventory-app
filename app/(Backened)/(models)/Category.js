import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: "string", required: true }
}, {
    timestamps: true
})

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)

export default Category;