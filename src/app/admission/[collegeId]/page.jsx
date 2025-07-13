"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdmissionForm({ params }) {
  const { collegeId } = params;
  const router = useRouter();

  const [college, setCollege] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    subject: '',
    photo: null,
  });

  // Fetch the college details
  useEffect(() => {
    const fetchCollege = async () => {
      const res = await fetch(`/api/colleges/${collegeId}`);
      const data = await res.json();
      setCollege(data);
    };
    fetchCollege();
  }, [collegeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = async () => {
      const photoUrl = reader.result;

      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          collegeId,
          collegeName: college?.name,
          admissionDate: college?.admissionDate,
          photoUrl,
          collegeDetails: {
            events: college?.events || [],
            sports: college?.sports || [],
            research: college?.research || [],
          },
        }),
      });

      if (res.ok) {
        router.push('/my-college');
      } else {
        alert('Submission failed');
      }
    };

    reader.readAsDataURL(form.photo);
  };

  if (!college) {
    return <p className="text-center mt-10">Loading college details...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Apply to {college.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name','email','phone','dob','address','subject'].map((f) => (
          <div key={f}>
            <label className="block text-sm font-medium">
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </label>
            <input
              required
              type={f === 'email'? 'email':'text'}
              name={f}
              value={form[f]}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium">Photo</label>
          <input
            required
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="mt-1 block w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Application</button>
      </form>
    </div>
  );
}
