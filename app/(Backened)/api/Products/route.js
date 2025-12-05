
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { products } from "../../../../lib/mongodb";
import Product from "@/(Backened)/(models)/Product";

export async function GET() {
    try {
        const product = await products.find({}).project({ _v: 0 }).toArray();
        return NextResponse.json({ status: 200, product })
    } catch (error) {
        console.log('Error Fetching Data', error)
        return NextResponse.json({ status: 409 })
    }
}

export async function POST(req) {
    const session = await getServerSession(options)
    try {
        const body = await req.json();
        const userData = body.formData;
        //    Confirm Data Exist
        if (!userData?.name || !userData.category || !userData.quantity || !userData.weight || !userData.amount || !userData.status) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }
        await Product.create({
            ...userData,
            createdBy: session.user.name
        });
        return NextResponse.json({ message: "Product Created." }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        await Product.findByIdAndDelete(id);
        products;
        return NextResponse.json({ message: 'Product Deleted' }, { status: 200 })
    } catch (error) {
        console.log('Error Fetching Data')
    }
}