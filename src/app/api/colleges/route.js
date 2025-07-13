// src/app/api/colleges/route.js
// import { dbConnect } from "@/lib/dbConnect";

import { dbConnect } from "@/src/lib/dbConnect";

export async function GET() {
  console.log("🚀 GET /api/colleges called");
  const collection = await dbConnect("CollegiaDB");
  const colleges = await collection.find({}).toArray();
  console.log(`Fetched ${colleges.length} colleges`);
  return Response.json(colleges);
}
