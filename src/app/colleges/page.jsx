"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CollegesPage() {
  const [colleges, setColleges] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .catch(console.error);
    setReady(true);
  }, []);

  if (!ready) return <p className="text-center mt-8">Loading...</p>;
  if (!Array.isArray(colleges))
    return (
      <p className="text-center mt-8">Error loading: {JSON.stringify(colleges)}</p>
    );

  const cardVariants = {
    hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" },
  };
  const imageVariants = {
    hover: { scale: 1.1 },
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {colleges.map((c, i) => (
        <motion.div
          key={c._id ?? i}
          className="card bg-[#5b2a04] rounded-lg overflow-hidden"
          variants={cardVariants}
          whileHover="hover"
          transition={{ duration: 0.3 }}
        >
          {c.image && (
            <motion.div
              className="relative h-48 w-full overflow-hidden"
              variants={imageVariants}
              whileHover="hover"
              transition={{ duration: 0.5 }}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          )}

          <div className="p-4 flex flex-col flex-1">
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p className="text-sm mt-1">
              <strong>Admission:</strong> {c.admissionDates}
            </p>

            <div className="mt-3 flex flex-col flex-1">
              <div>
                <h3 className="font-medium">🎓 Events</h3>
                <ul className="list-disc list-inside text-sm ml-2">
                  {c.eventDetails?.map((ev, idx) => (
                    <li key={idx}>{ev}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <h3 className="font-medium">🧪 Research</h3>
                <ul className="list-disc list-inside text-sm ml-2">
                  {c.researchWorks?.map((rw, idx) => (
                    <li key={idx}>{rw}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <h3 className="font-medium">🏅 Sports</h3>
                <div className="flex flex-wrap mt-1 gap-2">
                  {c.sportsCategories?.map((sp, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link href={`/college/${c._id ?? i}`}>
              <button className="mt-4 btn btn-primary btn-sm self-start">
                Details
              </button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
