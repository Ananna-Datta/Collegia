// app/api/admissions/route.js
import { dbConnect } from "@/src/lib/dbConnect";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    console.log("Received email param:", email);

    if (!email) {
      return new Response(JSON.stringify({ error: "Email parameter is required" }), {
        status: 400,
      });
    }

    const col = await dbConnect("admission");
    const admissions = await col.find({ email }).toArray();

    return new Response(JSON.stringify({ admissions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching admissions:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
