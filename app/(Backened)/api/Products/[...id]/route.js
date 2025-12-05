import Product from "@/(Backened)/(models)/Product";
import { products } from "../../../../../lib/mongodb"
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const  id  = params
    const { newName: name, newWeight: weight, newQuantity: quantity, newAmount: amount, newStatus: status } = await request.json();
    products;
    Product.findByIdAndUpdate(id, { name, weight, quantity, amount, status });
    return NextResponse.json({ message: "Product Updated" }, { status: 200 });
}