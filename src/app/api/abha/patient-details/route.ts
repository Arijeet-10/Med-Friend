import { NextRequest, NextResponse } from "next/server";

const patients = [
  {
    id: "1",
    name: "Anita Sharma",
    avatar: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
    avatarFallback: "AS",
    email: "anita.sharma@example.com",
    age: 34,
    height: "5'6",
    gender: "Female",
    abhaId: "22-3344-5566-7788",
    lastVisit: "2024-06-15",
    bmi: 23.1,
    blood_pressure: "120/80",
    blood_group: "O+",
    summary: "Patient has a history of anemia and thyroid disorder. Regular blood tests recommended.",
    diseaseTags: ["Anemia", "Thyroid Disorder"],
    prescriptions: [
      {
        id: "RX101",
        date: "2024-06-15",
        medication: "Levothyroxine",
        dosage: "50 mcg daily",
        status: "Active",
      },
    ],
    labReports: [
      {
        id: "LAB101",
        date: "2024-06-12",
        test: "CBC",
        status: "Completed",
        imageUrl: "https://placehold.co/600x400.png",
      },
    ],
  },
  {
    id: "2",
    name: "Ramesh Verma",
    avatar: "https://placehold.co/100x100.png",
    avatarFallback: "RV",
    email: "ramesh.verma@example.com",
    age: 68,
    gender: "Male",
    abhaId: "45-6789-1234-5678",
    lastVisit: "2024-07-20",
    bmi: 27.3,
    summary: "Patient is a 68-year-old male with a history of Coronary Artery Disease, Hypertension, and Osteoarthritis. Regular monitoring and medications are ongoing.",
    diseaseTags: ["Coronary Artery Disease", "Hypertension", "Osteoarthritis"],
    prescriptions: [
      {
        id: "RX900",
        date: "2024-07-20",
        medication: "Atorvastatin 20mg",
        dosage: "1 tablet at night",
        status: "Active",
      },
      {

        
        id: "RX882",
        date: "2024-06-05",
        medication: "Aspirin 75mg",
        dosage: "1 tablet daily",
        status: "Active",
      },
      {
        id: "RX850",
        date: "2024-04-10",
        medication: "Losartan 50mg",
        dosage: "1 tablet in the morning",
        status: "Inactive",
      },
    ],
    labReports: [
      {
        id: "LAB410",
        date: "2024-07-15",
        test: "ECG",
        status: "Completed",
        imageUrl: "https://placehold.co/600x400.png",
      },
      {
        id: "LAB405",
        date: "2024-06-01",
        test: "Liver Function Test (LFT)",
        status: "Completed",
        imageUrl: "https://placehold.co/600x400.png",
      },
    ],
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Patient ID is required" }, { status: 400 });
  }

  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json(patient);
}
