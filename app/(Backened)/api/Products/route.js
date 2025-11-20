
import { NextResponse } from "next/server";
import Product from "@/(Backened)/(models)/Product";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Products } from "../../../../lib/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        const userData = body.formData;
        const session = await getServerSession(options)
        //    Confirm Data Exist
        if (!userData?.name || !userData.category || !userData.quantity || !userData.weight || !userData.amount || !userData.status) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }
        await Product.create({
            ...userData,
            createdBy:session.user.name
        });
        return NextResponse.json({ message: "Product Created." }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function GET() {
    try{
    const Product = await Products.find({}).project({__v:0,_id}).limit(20).toArray()
    return NextResponse.json({status:201})
    }catch(error){
      
    }
}
