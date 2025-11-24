import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

const DB_NAME = "gadget-shop";
const COLLECTION_NAME = "products";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const products = await db.collection(COLLECTION_NAME).find({}).toArray();

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, price, description, image, category } = body;

    if (!title || !price) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      image,
      category,
      createdAt: new Date(),
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(newProduct);

    return NextResponse.json(
      { message: "Product Created", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}
