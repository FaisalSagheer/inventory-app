
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import connect from "../../../../lib/mongodb";
import Product from "@/(Backened)/(models)/Product";


export async function POST(req) {
    const session = await getServerSession(options)
    try {
        const body = await req.json();
        const userData = body.formData;
        await Product.create({
            ...userData,
            createdBy: session.user.name
        });
        return NextResponse.json({ message: "Product Created." }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error Creating Product", error }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connect()
        const products = await Product.find().sort({ createdAt: -1 });
        return new NextResponse(JSON.stringify(products), { status: 200 })
    } catch (error) {
        // console.log('Error Fetching Data', error)
        return new NextResponse('Error Fetching Products' + error.message, { status: 500 })
    }
}
export async function DELETE() {
    try {
        await connect();
        const deleteMany = await Product.deleteMany();
        return new NextResponse(JSON.stringify({ message: 'Products Deleted', Product: deleteMany }), { status: 200 })
    } catch (error) {
        return new NextResponse(('Deletion Error' + error.message), { status: 500 })
    }
}



