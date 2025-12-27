
import Product from "@/(Backened)/(models)/Product";
import connect from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";


export async function DELETE(request, { params }) {
    try {
        await connect();
        const { id } = await params
        if (!id) {
            return new NextResponse(JSON.stringify({ message: "Product ID not found" }), { status: 400 })
        }
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return new NextResponse(JSON.stringify({ message: "Product not found in the db" }), { status: 400 })
        }
        return new NextResponse(JSON.stringify({ message: 'Product Deleted!', User: deletedProduct }), { status: 200 })
    } catch (error) {
        return new NextResponse("Error In Deleting Product" + error.message, { status: 500 })
    }
}

export async function GET(request, { params }) {
    try {
        await connect()
        const { id } = await params
        const productId = await Product.findById(id);
        if (!productId) {
            return new NextResponse(JSON.stringify({ message: "No Such Id Exist" }), { status: 400 });
        }
        return new NextResponse(JSON.stringify({ message: "Product Exist!", Product: productId }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse({ message: 'Error Fetching Id' }, { status: 500 })
    }
}

