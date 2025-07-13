// app/api/admissions/route.js
// import { dbConnect } from "@/lib/dbConnect";

import { dbConnect } from "@/src/lib/dbConnect";

// import { dbConnect } from "@/src/lib/dbConnect";

export async function POST(request) {
  try {
    const data = await request.json(); // ✅ Parse JSON data

    if (!data) {
      return new Response(JSON.stringify({ error: "No data provided" }), { status: 400 });
    }

    // Connect to the 'admission' collection
    const col = await dbConnect("admission");
    const result = await col.insertOne(data);

    return new Response(JSON.stringify({ ok: true, insertedId: result.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.error("Admission insert error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
