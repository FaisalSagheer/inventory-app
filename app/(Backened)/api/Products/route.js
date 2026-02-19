
import { Types } from "mongoose";
import User from "@/(Backened)/(models)/User";
import Product from "@/(Backened)/(models)/Product";
import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {

    const body = await request.json();
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

    const productData = await body.formData;

    const newProduct = new Product({
      ...productData,
      user: new Types.ObjectId(userId),
    });

    await newProduct.save();

    return new NextResponse(JSON.stringify(
      {
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 }
    )
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse(
      { message: "Error creating product", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('_id');

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: 'Invalid or missing User ID' },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const products = await Product.find({ user: userId });

    return NextResponse.json({ products }, { status: 200 });
  } catch (_) {
    return NextResponse.json(
      { message: 'Failed to fetch products'},
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await connect();
    const deleteMany = await Product.deleteMany();
    if (deleteMany.deletedCount === 0) {
      return new NextResponse(JSON.stringify({ message: 'Empty!' }), { status: 400 })
    }
    return new NextResponse(JSON.stringify({ message: 'Products Deleted!', Product: deleteMany }), { status: 200 })
  } catch (error) {
    return new NextResponse('Deletion Error' + error.message, { status: 500 })
  }
}



