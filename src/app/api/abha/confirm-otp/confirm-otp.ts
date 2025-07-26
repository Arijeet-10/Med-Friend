import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { otp, transactionId } = await req.json();

  if (otp === "123456") {
    return NextResponse.json({
      success: true,
      patientId: transactionId === "txn-rahul" ? "2" : "1",
      authToken: "mock-token",
    });
  } else {
    return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 401 });
  }
}