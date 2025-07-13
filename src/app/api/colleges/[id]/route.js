// src/app/api/colleges/[id]/route.js
// import { dbConnect } from "@/lib/dbConnect";
import { dbConnect } from "@/src/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const { id } = await params;
  const col = await dbConnect("CollegiaDB");
  const college = await col.findOne({ _id: new ObjectId(id) });
  if (!college) return new Response("Not found", { status: 404 });
  return Response.json(college);
}
