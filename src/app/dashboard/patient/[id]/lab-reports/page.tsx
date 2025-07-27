"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface LabReport {
  id: string;
  date: string;
  test: string;
  status: string;
  imageUrl: string;
}

export default function LabReportsPage({ params }: { params: { id: string } }) {
  const { id: patientId } = useParams();
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // const response = await fetch(`/api/patient/${patientId}`);
        const response = await fetch(`/api/abha/patient-details?id=${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch patient data");

        const data = await response.json();
        setLabReports(data.labReports || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  if (loading) return <p className="text-gray-600">Loading lab reports...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-teal-800 mb-6">Lab Reports</h1>

      {labReports.length === 0 ? (
        <p className="text-gray-600">No lab reports found for patient ID: {patientId}</p>
      ) : (
        <ul className="space-y-4">
          {labReports.map((report) => (
            <li
              key={report.id}
              className="border p-4 rounded-md shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {report.test}
                  </h2>
                  <p className="text-sm text-gray-500">Date: {report.date}</p>
                  <p className="text-sm text-gray-500">Status: {report.status}</p>
                </div>
                <img
                  src={report.imageUrl}
                  alt={report.test}
                  className="h-24 w-auto object-contain border rounded-md"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
