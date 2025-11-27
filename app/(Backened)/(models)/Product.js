import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const productSchema = new Schema(
    {
        name: String,
        weight: Number,
        quantity: Number,
        amount: Number,
        status: {
            type: String,
            enum: ["success", "pending"],
            default: "pending"
        },
        category: {
            type: String,
            enum: ["grocery", "cloth"],
            default: "grocery"
        },
        createdBy: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
