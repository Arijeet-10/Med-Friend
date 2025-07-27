import { NextResponse } from 'next/server';

const validIds = ["arijeet@abdm", "1234-5678-9012-3456", "rahul@abdm", "5678-1234-9012-3456"];

export async function POST(req: Request) {
  const { healthId } = await req.json();
  if (validIds.includes(healthId)) {
    return NextResponse.json({ exists: true });
  } else {
    return NextResponse.json({ exists: false }, { status: 404 });
  }
}