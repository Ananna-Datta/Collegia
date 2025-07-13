// app/api/admissions/[id]/route.js
import { dbConnect } from "@/src/lib/dbConnect";
import { ObjectId } from "mongodb";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { db } = await dbConnect();
  const colleges = await db.collection("CollegiaDB").find().toArray();
  return colleges.map((c) => ({ id: c._id.toString() }));
}

export default async function CollegeDetail({ params }) {
  const { db } = await dbConnect();
  const college = await db
    .collection("CollegiaDB")
    .findOne({ _id: new ObjectId(params.id) });

  if (!college) return <div>College not found</div>;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="text-3xl font-bold">{college.name}</h1>
      <p className="mt-2">Admission starts: {college.admissionDate}</p>
      {/* Later: add detail info and admission form here */}
    </div>
  );
}
