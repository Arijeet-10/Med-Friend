"use client"

import Link from "next/link"
import {
  Loader,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/hooks/use-auth"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/firebase"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader className="h-10 w-10 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return null; // The AuthProvider will handle the redirect.
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo className="h-8 w-auto" />
            <span className="text-xl font-bold text-primary">Medfriend</span>
        </Link>
        <UserNav />
      </header>
      <main className="flex flex-1">
        {children}
      </main>
    </div>
  )
}
