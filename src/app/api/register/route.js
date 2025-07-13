import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnect } from "@/src/lib/dbConnect";
// import { dbConnect } from "@/lib/dbConnect";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password)
    return NextResponse.json({ success: false, message: "All fields are required" });

  const userCollection = await dbConnect("users");

  const existing = await userCollection.findOne({ email });
  if (existing) return NextResponse.json({ success: false, message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await userCollection.insertOne({ name, email, password: hashedPassword });

  return NextResponse.json({ success: true, message: "Registered successfully" });
}
