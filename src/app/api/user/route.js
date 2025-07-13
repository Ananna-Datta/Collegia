// import { dbConnect } from "../../../utils/db"; // Adjust the path as needed
// import { ObjectId } from "mongodb";

import { dbConnect } from "@/src/lib/dbConnect";

// GET request to fetch admission data by email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      );
    }

    const admissionCollection = await dbConnect("admissions");
    const admissions = await admissionCollection.find({ email }).toArray();

    if (admissions.length === 0) {
      return new Response(
        JSON.stringify({ message: "No admissions found for this email" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(admissions), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch admission details" }),
      { status: 500 }
    );
  }
}
