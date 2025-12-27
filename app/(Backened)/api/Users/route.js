
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connect from "../../../../lib/mongodb";
import User from "@/(Backened)/(models)/User";



export async function POST(req) {
  try {
    await connect();
    const body = await req.json();
    const userData = body.formData;
    // check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();
    if (duplicate) {
      return new NextResponse(JSON.stringify({ message: "Email Already Registered" }), { status: 409 });
    }
    const hashPassword = await bcrypt.hash(userData.password, 12)
    userData.password = hashPassword;
    await User.create(userData)
    return new NextResponse(JSON.stringify({ message: "User Created." }, userData), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error Creating User" + error.message}), { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    return new NextResponse(JSON.stringify(users), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error Fetching Users" }, error), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json()
    const { _id, newUsername } = body
    await connect()
    if (!_id || !newUsername) {
      return new NextResponse({ message: "User not found" }, { status: 400 })
    }
    const updateUser = await User.findOneAndUpdate(
      { _id },
      { name: newUsername },
      { new: true }
    )
    if (!updateUser) {
      return new NextResponse(JSON.stringify({ message: "User not found in the db" }, updateUser), { status: 400 })
    }
    return new NextResponse(JSON.stringify({ message: "User Updated", User: updateUser }), { status: 200 })
  } catch (error) {
    return new NextResponse("Error In Updating User" + error.message, { status: 500 })
  }
}




