"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const role = searchParams.get("role") || "User";
  
  // We'll treat the Registration ID as the email for Firebase authentication
  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationId || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both your Registration ID and password.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, registrationId, password);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please check your ID and password.",
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
        <Link href="/signup" passHref>
          <Button variant="ghost" className="text-teal-800 hover:text-teal-900">Register</Button>
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center space-y-8 px-4 text-center">
        <h1 className="text-4xl font-bold text-teal-800">
          Login as a {role}
        </h1>
        <Card className="w-full max-w-lg rounded-2xl border-2 border-teal-600 bg-teal-50/50 p-4 shadow-lg">
          <CardContent className="pt-6">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2 text-left">
                <Label htmlFor="registration-id" className="px-2 font-semibold text-teal-800">
                  Registration ID
                </Label>
                <Input
                  id="registration-id"
                  type="email"
                  placeholder="Please Enter Your Registration ID"
                  required
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  disabled={isLoading}
                  className="rounded-full border-teal-500 bg-white px-5 py-6 ring-offset-teal-50 focus:border-teal-700 focus:ring-teal-700"
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="password" className="px-2 font-semibold text-teal-800">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Please Enter Your Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="rounded-full border-teal-500 bg-white px-5 py-6 ring-offset-teal-50 focus:border-teal-700 focus:ring-teal-700"
                />
              </div>
              <div className="flex justify-end px-2">
                <Link
                  href="#"
                  className="text-sm text-teal-700 hover:underline"
                  prefetch={false}
                >
                  Forgot Your ID or Password ?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full max-w-xs mx-auto rounded-full bg-teal-600 py-6 text-lg font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}