// app/api/admissions/[email]/route.js
import { dbConnect } from "@/src/lib/dbConnect";

export const dynamicParams = false;

export async function GET({ params }) {
  try {
    const { email } = params;
    if (!email) {
      return new Response(JSON.stringify({ error: "Email parameter is required" }), { status: 400 });
    }

    // Connect to the 'admission' collection
    const col = await dbConnect("admission");
    const admission = await col.findOne({ email });

    if (!admission) {
      return new Response(JSON.stringify({ error: "Admission not found for this email" }), { status: 404 });
    }

    return new Response(JSON.stringify(admission), { status: 200 });
  } catch (error) {
    console.error("Admission fetch error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
