
import Category from "@/(Backened)/(models)/Category";
import { NextResponse } from "next/server";
import connect from "../../../../lib/mongodb";
import { Types } from "mongoose";
import User from "@/(Backened)/(models)/User";


export async function POST(request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('_id')

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "No Such User Exist!" }), { status: 400 })
        }
        await connect();
        const user = await User.findById(userId)
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "No Such User In DB Exist!" }), { status: 404 })
        }
        const { title } = await request.json()
        const newCategory = new Category({
            title,
            user: new Types.ObjectId(userId)
        })
        await newCategory.save()
        return new NextResponse(JSON.stringify({ message: "Category Created!", Category: newCategory }), { status: 201 })
    } catch (error) {
        return new NextResponse("Error In Creating Category" + error.message, { status: 500 })
    }
}
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('_id')

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "No Such User Exist!" }), { status: 400 })
        }
        await connect();
        const user = await User.findById(userId)
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "No Such User In DB Exist!" }), { status: 404 })
        }
        const categories = await Category.find({
            user: new Types.ObjectId(userId)
        })
        return NextResponse.json({ categories }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error In Fetching Category" }, { status: 500 })
    }
}