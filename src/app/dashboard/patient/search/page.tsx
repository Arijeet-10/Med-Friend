
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function PatientSearchPage() {
    const [searchType, setSearchType] = useState("abhaId");
    const [identifier, setIdentifier] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const { toast } = useToast();
    const router = useRouter();

    // Simulates: POST /v1/search/searchByHealthId
    const searchByHealthId = async (id: string) => {
        console.log(`Searching for ABHA ID: ${id}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, you'd check the API response.
        // For this simulation, we'll assume any non-empty ID is valid.
        if (id) {
            return { exists: true };
        }
        return { exists: false };
    }

    // Simulates: POST /v1/auth/init
    const initiateAuth = async () => {
        console.log("Initiating authentication...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        const newTransactionId = `txn-${Date.now()}`;
        console.log(`Authentication initiated, transaction ID: ${newTransactionId}`);
        setTransactionId(newTransactionId);
        return { success: true };
    }
    
    // Simulates: POST /v1/auth/confirmWithMobileOTP
    const confirmWithMobileOtp = async (txnId: string, userOtp: string) => {
        console.log(`Confirming auth for transaction ${txnId} with OTP.`);
        await new Promise(resolve => setTimeout(resolve, 1500));
        // In a real app, you'd verify the OTP with the backend.
        // For this simulation, we'll accept any 6-digit OTP.
        if (userOtp.length === 6) {
             // Simulates getting an auth token and then fetching profile
             console.log("OTP Verified. Fetching profile...");
             await new Promise(resolve => setTimeout(resolve, 1000));
             return { success: true, patientId: "1" }; // Mock patient ID
        }
        return { success: false };
    }


    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifier.trim()) {
            toast({ title: "ABHA ID / Address required", variant: "destructive" });
            return;
        }
        setIsLoading(true);

        const account = await searchByHealthId(identifier);
        if (!account.exists) {
            toast({ title: "Invalid Identifier", description: "This ABHA ID or Address does not exist.", variant: "destructive" });
            setIsLoading(false);
            return;
        }

        const authResult = await initiateAuth();
        if(authResult.success) {
            toast({ title: "OTP Sent Successfully", description: "An OTP has been sent to the patient's registered mobile number." });
            setIsOtpSent(true);
        } else {
             toast({ title: "Failed to Send OTP", description: "Could not initiate authentication. Please try again.", variant: "destructive" });
        }
        
        setIsLoading(false);
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp.trim() || otp.length !== 6) {
             toast({ title: "Invalid OTP", description: "Please enter the 6-digit OTP.", variant: "destructive" });
            return;
        }
        setIsLoading(true);
        
        const result = await confirmWithMobileOtp(transactionId, otp);

        if (result.success && result.patientId) {
            // On success, redirect to patient page
            router.push(`/dashboard/patient/${result.patientId}`);
        } else {
            toast({ title: "Verification Failed", description: "The OTP is incorrect or has expired.", variant: "destructive" });
            setIsLoading(false);
        }
    }


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
                                    An OTP has been sent to the mobile number linked with ABHA ID: <span className="font-semibold">{identifier}</span>.
                                </p>
                            </div>
                             <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {isLoading ? "Verifying..." : "Verify & Fetch Records"}
                            </Button>
                             <Button variant="link" size="sm" onClick={() => {setIsOtpSent(false); setOtp("");}} className="w-full" disabled={isLoading}>
                                Go Back
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
