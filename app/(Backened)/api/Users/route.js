
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/(Backened)/(models)/User";
import { users } from "../../../../lib/mongodb";

export async function GET() {
  try {
    const query = {}
    const user = await users.find(query).project({ _id: 0, __v: 0, password: 0}).toArray()
    return NextResponse.json({ status: 200, user })
  } catch (error) {
    console.log('Error Fetching Data', error)
    // return NextResponse.json({ status: 500 })
  }
}
export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;
    //    Confirm Data Exist
    if (!userData?.email || !userData.password || !userData.name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();
    if (duplicate) {
      return NextResponse.json({ message: "Duplication Email" }, { status: 409 });
    }
    const hashPassword = await bcrypt.hash(userData.password, 12)
    userData.password = hashPassword;
    await User.create(userData);
    return NextResponse.json({ message: "User Created." }, { status: 201 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
