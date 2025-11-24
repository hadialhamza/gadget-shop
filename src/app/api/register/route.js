import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, password, image } = await request.json();

    // ভ্যালিডেশন
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("gadget-shop");

    // ইউজার চেক
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // নতুন ইউজার তৈরি (সরাসরি পাসওয়ার্ড সেভ করা হচ্ছে)
    const newUser = {
      name,
      email,
      password: password, // ⚠️ No Hashing (Plain Text)
      image: image || "",
      role: "user",
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
}
