
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/(Backened)/(models)/User";
import { users } from "../../../../lib/mongodb";


export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;
    //    Confirm Data Exist
    if (!userData?.email && !userData.password && !userData.name && !userData.role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    } else if (!userData.password) {
      return NextResponse.json(
        { message: "Password Required" },
        { status: 400 }
      );
    } else if (!userData.name) {
      return NextResponse.json(
        { message: "Name Required" },
        { status: 400 }
      );
    } else if (!userData.email) {
      return NextResponse.json(
        { message: "Email Required" },
        { status: 400 }
      );
    } else if (!userData.role) {
      return NextResponse.json(
        { message: "Role Required" },
        { status: 400 }
      );
    } else {
      // check for duplicate emails
      const duplicate = await User.findOne({ email: userData.email })
        .lean()
        .exec();
      if (duplicate) {
        return NextResponse.json({ message: "Email Already Registered" }, { status: 409 });
      }
      const hashPassword = await bcrypt.hash(userData.password, 12)
      userData.password = hashPassword;
      await User.create(userData)
      return NextResponse.json({ message: "User Created." }, { status: 201 })
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  const user = await users.find({}).project({ _id: 0, __v: 0, password: 0 }).toArray()
  return NextResponse.json({ status: 200, user })
}