// app/admission/[collegeId]/page.jsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdmissionForm({ params }) {
  const { collegeId } = params;
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    subject: '',
    photo: null,
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev,  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = async () => {
      const photoUrl = reader.result;
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, collegeId }),
      });
      if (response.ok) {
        router.push('/my-college');
      } else {
        alert('Submission failed');
      }
    };
    reader.readAsDataURL(form.photo);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admission Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'phone', 'dob', 'address', 'subject'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium">{field}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium">Photo</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full"
            
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Application</button>
      </form>
    </div>
  );
}
