import { NextResponse } from 'next/server';

interface PatientProfile {
  healthId: string;
  name: string;
  gender: string;
  dob: string;
  mobile: string;
  address: string;
  allergies: string[];
  medications: string[];
  visits: string[];
}

const profiles: Record<string, PatientProfile> = {
  "1": {
    healthId: "arijeet@abdm",
    name: "Arijeet Das",
    gender: "M",
    dob: "2002-08-14",
    mobile: "9876543210",
    address: "Kolkata, India",
    allergies: ["Pollen", "Peanuts"],
    medications: ["Paracetamol", "Cetirizine"],
    visits: ["2023-12-01 - Fever", "2024-02-15 - Allergy"],
  },
  "2": {
    healthId: "rahul@abdm",
    name: "Rahul Sharma",
    gender: "M",
    dob: "1998-01-25",
    mobile: "9123456789",
    address: "Delhi, India",
    allergies: ["Dust"],
    medications: ["Ibuprofen"],
    visits: ["2024-01-10 - Cold"],
  },
};

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (auth === "Bearer mock-token") {
    const url = new URL(req.url);
    const id = url.searchParams.get("id") || "1";
    const profile = profiles[id as keyof typeof profiles] || profiles["1"];
    return NextResponse.json(profile);
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }
}
