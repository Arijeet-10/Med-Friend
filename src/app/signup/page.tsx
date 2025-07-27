"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SignupFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const role = searchParams.get("role") || "User";

  const [fullName, setFullName] = useState("");
  const [registrationId, setRegistrationId] = useState(""); // This will be the email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords you entered do not match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registrationId, password);
      
      // Add the user's full name to their Firebase profile
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // NOTE: You would typically also save the selected 'role' to a database 
      // like Firestore, linked by the user's ID (userCredential.user.uid).

      toast({
        title: "Registration Successful!",
        description: "Redirecting you to the dashboard.",
      });

      router.push("/dashboard");

    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <header className="flex items-center justify-between p-4 sm:p-8">
        <Button variant="ghost" onClick={() => router.back()} className="text-teal-800 hover:text-teal-900">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
          <span className="text-2xl font-bold text-gray-700">Medfriend</span>
        </div>
        <Link href="/login" passHref>
          <Button variant="ghost" className="text-teal-800 hover:text-teal-900">Login</Button>
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center space-y-8 px-4 text-center">
        <h1 className="text-4xl font-bold text-teal-800">
          Register as a {role}
        </h1>
        <Card className="w-full max-w-lg rounded-2xl border-2 border-teal-600 bg-teal-50/50 p-4 shadow-lg">
          <CardContent className="pt-6">
            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="space-y-2 text-left">
                <Label htmlFor="full-name" className="px-2 font-semibold text-teal-800">
                  Full Name
                </Label>
                <Input
                  id="full-name"
                  type="text"
                  placeholder="Please Enter Your Full Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                  className="rounded-full border-teal-500 bg-white px-5 py-6 ring-offset-teal-50"
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="registration-id" className="px-2 font-semibold text-teal-800">
                  Registration ID (Email)
                </Label>
                <Input
                  id="registration-id"
                  type="email"
                  placeholder="Please Enter Your Email ID"
                  required
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  disabled={isLoading}
                  className="rounded-full border-teal-500 bg-white px-5 py-6 ring-offset-teal-50"
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="password" className="px-2 font-semibold text-teal-800">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Please Enter Your Password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="rounded-full border-teal-500 bg-white px-5 py-6 ring-offset-teal-50"
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="confirm-password" className="px-2 font-semibold text-teal-800">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Please Confirm Your Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="rounded-full border-teal-500 bg-white px-5 py-6 ring-offset-teal-50"
                />
              </div>
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full max-w-xs mx-auto rounded-full bg-teal-600 py-6 text-lg font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}