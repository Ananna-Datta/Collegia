"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MyCollege() {
  const { data: session } = useSession();
  const router = useRouter();

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/my-college?email=${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) alert(data.error);
          else setAdmissions(data.admissions || []);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (loading) return <p>Loading your college details...</p>;

  if (!admissions.length) return <p>No admission details found for your email.</p>;

  const admission = admissions[0];
  const ad = admission.admissionDetails;
  const college = admission.collegeDetails || {};
  const reviews = admission.reviews || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold text-gray-900">My College Admission</h1>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">College</h3>
            <p className="text-gray-600">{admission.collegeName}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Admission Date</h3>
            <p className="text-gray-600">{college.admissionDate}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Research Count</h3>
            <p className="text-gray-600">{(college.research || []).length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Sports</h3>
            <p className="text-gray-600">{(college.sports || []).join(", ")}</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow p-6 space-y-4">
          {/* <img src={ad.image} alt="College" className="w-full h-64 object-cover rounded" /> */}
          {/* <div className="space-y-2">
            <p><strong className="text-gray-700">Subject:</strong> {ad.subject}</p>
            <p><strong className="text-gray-700">DOB:</strong> {ad.dob}</p>
            <p><strong className="text-gray-700">Phone:</strong> {ad.phone}</p>
            <p><strong className="text-gray-700">Address:</strong> {ad.address}</p>
          </div> */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Research Works</h3>
            <ul className="list-disc ml-5 text-gray-700">
              {(college.research || []).map((r, i) => (
                <li key={i}>
                  {r.link ? (
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{r.title}</a>
                  ) : (
                    r.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h3>

          {reviews.length ? reviews.map((rev, idx) => (
            <div key={idx} className="border-b py-3">
              <p><strong className="text-gray-700">Rating:</strong> {rev.rating} / 5</p>
              <p className="text-gray-600">{rev.comment}</p>
            </div>
          )) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}

          <form className="mt-4 space-y-3">
            <label className="block text-gray-700">
              Rating:
              <select name="rating" className="ml-2 border rounded px-2 py-1 text-gray-700">
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <textarea name="comment" rows="3" className="w-full border rounded px-3 py-2 text-gray-700" placeholder="Write your review..." />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit Review
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
