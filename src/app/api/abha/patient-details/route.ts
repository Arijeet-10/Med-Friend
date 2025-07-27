import { NextResponse } from "next/server";

// Mock data
const patient = {
  id: "1",
  name: "Arijeet Das",
  avatar: "https://placehold.co/100x100.png",
  avatarFallback: "AD", // Corrected fallback
  email: "arijeet.das@example.com", // Corrected email
  age: 21,
  gender: "Male", // Corrected gender
  abhaId: "12-3456-7890-1234",
  lastVisit: "2024-07-29",
};

const prescriptions = [
  { id: "RX728", date: "2024-07-29", medication: "Azithromycin 500mg", dosage: "1 tablet daily for 5 days", status: "Active" },
  { id: "RX721", date: "2024-06-15", medication: "Metformin 500mg", dosage: "1 tablet twice daily", status: "Active" },
  { id: "RX698", date: "2024-02-10", medication: "Amlodipine 5mg", dosage: "1 tablet daily", status: "Inactive" },
];

const labReports = [
    { id: "LAB301", date: "2024-07-20", test: "Complete Blood Count (CBC)", status: "Completed", imageUrl: "https://placehold.co/600x400.png" },
    { id: "LAB295", date: "2024-06-15", test: "Lipid Profile", status: "Completed", imageUrl: "https://placehold.co/600x400.png" },
];

export async function GET() {
  // In a real application, you would fetch this data based on a patient ID
  // For this example, we return the mock data directly.
  return NextResponse.json({
    patient,
    prescriptions,
    labReports,
  });
}