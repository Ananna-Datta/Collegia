// app/admission/page.jsx
import Link from 'next/link';
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function AdmissionPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/colleges`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }
  const colleges = await res.json();


  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Select a College to Apply</h1>
      <ul className="space-y-4">
        {colleges.map((college) => (
          <li key={college._id} className="border p-4 rounded-lg shadow-md">
            <Link href={`/admission/${college._id}`} className="text-xl font-semibold text-blue-600">
              {college.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
