"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// --- API Helper Functions (Moved outside the component) ---

// Gets the access token securely from our own API route
async function getAccessToken() {
    const res = await fetch("/api/abdm/token", { method: "POST" });
    const data = await res.json();
    return data.accessToken;
  }
  

// Initiates authentication to send OTP
async function initiateAuth(healthId: string) {
    const res = await fetch("/api/abha/initiate-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ healthId }),
    });
    return res.json();
}

// Confirms OTP and gets an auth token for profile access
async function confirmMobileOtp(txnId: string, otp: string) {
    const res = await fetch("/api/abha/confirm-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txnId, otp }),
    });
    return res.json();
}

// Fetches patient profile using the auth token from OTP confirmation
async function getPatientProfile(patientId: string) {
    const res = await fetch(`/api/abha/profile?id=${patientId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer mock-token`,
        },
    });
    return res.json();
}


export default function PatientSearchPage() {
    const [searchType, setSearchType] = useState("abhaId");
    const [identifier, setIdentifier] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const { toast } = useToast();
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifier.trim()) {
            toast({ title: "Identifier required", description: "Please enter an ABHA ID or Address.", variant: "destructive" });
            return;
        }
        setIsLoading(true);

        try {
            const accessToken = "mock-token";
            // Note: ABDM's search API is not strictly necessary for the auth flow, 
            // but can be used to check if an ID exists before sending an OTP.
            // We proceed directly to auth initiation.

            const authResult = await initiateAuth(identifier);

            if (authResult.txnId) {
                setTransactionId(authResult.txnId); // CORRECT: Store the transaction ID
                setIsOtpSent(true);
                toast({ title: "OTP Sent Successfully", description: "An OTP has been sent to the patient's registered mobile number." });
            } else {
                throw new Error(authResult.details?.[0]?.message || "Failed to send OTP");
            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "Could not initiate authentication. Please try again.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp.trim() || otp.length !== 6) {
            toast({ title: "Invalid OTP", description: "Please enter the 6-digit OTP.", variant: "destructive" });
            return;
        }
        setIsLoading(true);

        try {
            const accessToken = "mock-token";
            const result = await confirmMobileOtp(transactionId, otp);

            if (result.success && result.patientId) {
                const profile = await getPatientProfile(result.patientId);
                console.log("Patient Profile:", profile);
                toast({ title: "Verification Successful!", description: `Fetched profile for ${profile.name}` });
                router.push(`/dashboard/patient/${result.patientId}`);
            }
            else {
                throw new Error(result.details?.[0]?.message || "Verification failed");
            }
        } catch (error: any) {
            toast({ title: "Verification Failed", description: error.message || "The OTP is incorrect or has expired.", variant: "destructive" });
            setIsLoading(false);
        }
        // No need to set isLoading to false on success because the page will redirect
    };

    return (
        <div className="flex justify-center items-start pt-10">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Find Patient Health Records</CardTitle>
                    <CardDescription>Enter patient's ABHA ID or ABHA Address to begin.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!isOtpSent ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <RadioGroup defaultValue="abhaId" onValueChange={setSearchType} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="abhaId" id="abhaId" />
                                    <Label htmlFor="abhaId">ABHA ID</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="abhaAddress" id="abhaAddress" />
                                    <Label htmlFor="abhaAddress">ABHA Address</Label>
                                </div>
                            </RadioGroup>
                            <div className="space-y-2">
                                <Label htmlFor="identifier">{searchType === 'abhaId' ? 'ABHA ID' : 'ABHA Address'}</Label>
                                <Input
                                    id="identifier"
                                    placeholder={searchType === 'abhaId' ? 'e.g., 12-3456-7890-1234' : 'e.g., name@abdm'}
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                                {isLoading ? "Sending OTP..." : "Send OTP"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Enter OTP</Label>
                                <Input
                                    id="otp"
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    disabled={isLoading}
                                />
                                <p className="text-sm text-muted-foreground">
                                    An OTP was sent to the mobile number linked with <span className="font-semibold">{identifier}</span>.
                                </p>
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {isLoading ? "Verifying..." : "Verify & Fetch Records"}
                            </Button>
                            <Button variant="link" size="sm" onClick={() => { setIsOtpSent(false); setOtp(""); }} className="w-full" disabled={isLoading}>
                                Go Back
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}