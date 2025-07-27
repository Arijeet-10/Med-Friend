"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ChevronLeft, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Extract patient ID from URL, works for routes like /dashboard/patient/[id]/...
  const patientId = pathname.split('/')[3] || 'None';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      toast({ title: "Logged Out Successfully" });
      router.push("/");
    } catch (error: any) {
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  const sidebarNavItems = [
    { title: "Patient Profile", href: `/dashboard/patient/${patientId}` },
    { title: "Lab Reports", href: `/dashboard/patient/${patientId}/lab-reports` },
    { title: "Prescriptions", href: `/dashboard/patient/${patientId}/prescriptions` },
    { title: "Medical History", href: `/dashboard/patient/${patientId}/history` },
    { title: "Insurance Details", href: `/dashboard/patient/${patientId}/insurance` },
    { title: "Emergency", href: `/dashboard/patient/${patientId}/emergency` },
    { title: "Priority Score", href: `/dashboard/patient/${patientId}/priority-score` },
    { title: "Credit Point History", href: `/dashboard/patient/${patientId}/credit-history` },
    { title: "Institution Records", href: `/dashboard/patient/${patientId}/records` },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <header className="flex h-20 items-center justify-between border-b bg-teal-50 px-8">
        <div className="flex items-center gap-2">
          <Logo className="h-10 w-auto" />
          <span className="text-3xl font-bold text-gray-700">Medfriend</span>
        </div>
        <Button onClick={handleLogout} variant="ghost" className="text-xl font-semibold text-teal-800" disabled={isLoggingOut}>
          {isLoggingOut ? "Logging out..." : "Log Out"}
          <LogOut className="ml-2 h-5 w-5" />
        </Button>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-white p-6">
          <Button className="w-full" onClick={() => router.push('/dashboard')}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Change Patient
          </Button>
          <p className="mt-2 text-center text-xs text-gray-500">Current Patient ID: {patientId}</p>
          <nav className="mt-6 flex flex-col gap-2">
            {sidebarNavItems.map((item, index) => (
              <Link key={item.title} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start text-left"
                >
                  <span className="mr-2 text-gray-400">{index + 1}.</span> {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}