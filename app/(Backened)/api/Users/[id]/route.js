import User from "@/(Backened)/(models)/User";
import { NextResponse } from "next/server";
import connect from "../../../../../lib/mongodb";


export async function DELETE(request, { params }) {
    try {
        await connect();
        const { id } = await params
        if (!id) {
            return new NextResponse(JSON.stringify({ message: "User ID not found" }), { status: 400 })
        }
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return new NextResponse(JSON.stringify({ message: "User not found in the db" }), { status: 400 })
        }
        return new NextResponse(JSON.stringify({ message: 'User Deleted!', User: deletedUser }), { status: 200 })
    } catch (error) {
        return new NextResponse("Error In Deleting User" + error.message, { status: 500 })
    }
}


export async function GET(request, { params }) {
    try {
        await connect()
        const { id } = await params
        const UserId = await User.findById(id);
        if (!UserId) {
            return new NextResponse(JSON.stringify({ message: "No Such Id Exist" }), { status: 400 });
        }
        return new NextResponse(JSON.stringify({ message: "User Exist!", User: UserId }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse({ message: 'Error Fetching Id' }, { status: 500 })
    }
}
