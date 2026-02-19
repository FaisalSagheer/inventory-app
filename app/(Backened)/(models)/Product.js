import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        title: { type: String, required: true },
        weight: { type: String, required: true },
        quantity: { type: String, required: true },
        amount: { type: String, required: true },
        category: { type: String, enum: ["grocery", "cloth"], default: "grocery", required: true },
        status: { type: String, enum: ["success", "pending"], default: "pending", required: true }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
