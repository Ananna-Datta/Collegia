// app/college/[id]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CollegeDetail({ params }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/colleges/${id}`);

  if (!res.ok) {
    notFound();
  }

  const college = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
        {college.image && (
          <Image src={college.image} alt={college.name} fill sizes="100vw" style={{ objectFit: "cover" }} />
        )}
      </div>

      <h1 className="text-3xl font-bold">{college.name}</h1>
      <p className="text-lg"><strong>Admission Dates:</strong> {college.admissionDates}</p>
      <div>
        <h2 className="text-2xl font-semibold">Admission Process</h2>
        <p className="mt-1">{college.admissionProcess}</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Events Details</h2>
        <ul className="list-disc list-inside ml-4 mt-1">
          {college.eventDetails?.map((ev, i) => <li key={i}>{ev}</li>)}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Research Works</h2>
        <ul className="list-disc list-inside ml-4 mt-1">
          {college.researchWorks?.map((rw, i) => <li key={i}>{rw}</li>)}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Sports Categories</h2>
        <div className="flex flex-wrap gap-2 mt-1">
          {college.sportsCategories?.map((sp, i) => (
            <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {sp}
            </span>
          ))}
        </div>
      </div>

      <Link href="/colleges">
        <button className="btn btn-accent mt-6">Back to List</button>
      </Link>
    </div>
  );
}
