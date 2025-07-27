"use client";

import { useEffect, useState } from "react";

interface Prescription {
  id: string;
  date: string;
  medication: string;
  dosage: string;
  status: string;
}

export default function PrescriptionPage({ params }: { params: { id: string } }) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch("/api/abha/patient-details?id=${params.id}");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setPrescriptions(data.prescriptions || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) return <p className="text-gray-600">Loading prescriptions...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-purple-800 mb-6">Prescriptions</h1>

      {prescriptions.length === 0 ? (
        <p className="text-gray-600">No prescriptions found.</p>
      ) : (
        <ul className="space-y-4">
          {prescriptions.map((prescription) => (
            <li
              key={prescription.id}
              className="border p-4 rounded-md shadow-sm bg-white"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {prescription.medication}
                </h2>
                <p className="text-sm text-gray-600">Date: {prescription.date}</p>
                <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                <p
                  className={`text-sm font-medium ${
                    prescription.status === "Active" ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  Status: {prescription.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
