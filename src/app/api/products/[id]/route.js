import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";

const DB_NAME = "gadget-shop";
const COLLECTION_NAME = "products";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const product = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Deleted", result });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting" }, { status: 500 });
  }
}
