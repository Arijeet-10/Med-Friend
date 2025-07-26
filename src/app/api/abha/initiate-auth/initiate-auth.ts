import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { healthId } = await req.json();

  let transactionId = `txn-${Date.now()}`;

  // For known mock users, return specific txnId
  if (healthId === "rahul@abdm") {
    transactionId = "txn-rahul";
  }

  return NextResponse.json({ success: true, txnId:transactionId  });
}
