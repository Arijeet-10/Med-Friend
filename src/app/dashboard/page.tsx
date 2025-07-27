"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Search, User as UserIcon } from "lucide-react";
import { Logo } from "@/components/logo";

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For this example, we'll assume a successful search for any ID
    // and navigate to the patient details page with a mock ID.
    // In a real app, you'd verify the patientId exists first.
    if (patientId) {
      router.push(`/patient-details/${patientId}`);
    } else {
      toast({
        title: "Search Error",
        description: "Please enter a patient ID.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      {/* <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
          <span className="text-2xl font-bold text-gray-700">Medfriend</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {auth.currentUser?.displayName || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {auth.currentUser?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header> */}
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Patient Search
          </h1>
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-lg border bg-white p-2 shadow-sm"
          >
            <Input
              type="text"
              placeholder="Enter patient ID or name..."
              className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !patientId}>
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}