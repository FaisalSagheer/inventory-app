import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        weight: { type: Number, required: true },
        quantity: { type: Number, required: true },
        amount: { type: Number, required: true },
        status: {
            type: String,
            required: true,
            enum: ["success", "pending"],
            default: "pending"
        },
        category: {
            type: String,
            required: true,
            enum: ["grocery", "cloth"],
            default: "grocery"
        },
        createdBy: {
            type: String,
        },
    },
    {
        timestamps: true,
        _id: false
    }
);
productSchema.plugin(AutoIncrement, { inc_field: '_id', start_seq: 1 })

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
