// /src/app/api/abdm/token/route.ts
import { NextResponse } from 'next/server';

/**
 * This route handler acts as a secure backend proxy to fetch an access token
 * from the ABDM (Ayushman Bharat Digital Mission) gateway.
 * It uses a client ID and client secret stored as environment variables.
 */
export async function POST() {
  try {
    const clientId = process.env.ABDM_CLIENT_ID;
    const clientSecret = process.env.ABDM_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("ABDM environment variables are not set.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    // The official ABDM sandbox URL for creating a session
    const gatewayUrl = "https://dev.abdm.gov.in/gateway/v0.5/sessions";

    const response = await fetch(gatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        clientId: clientId,
        clientSecret: clientSecret,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("ABDM Gateway Error:", errorBody);
      return NextResponse.json(
        { error: "Failed to authenticate with ABDM gateway." },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // The access token is what we need for subsequent API calls
    return NextResponse.json({ accessToken: data.accessToken });

  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
