"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <header className="absolute top-0 w-full p-8">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
          <span className="text-2xl font-bold text-gray-700">Medfriend</span>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl font-bold text-teal-800">
          Welcome to Medfriend !
        </h1>
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          <Link href="/login" passHref>
            <Button
              variant="outline"
              className="h-40 w-40 rounded-2xl border-2 border-teal-600 bg-teal-50 text-2xl font-semibold text-teal-800 shadow-lg transition-transform hover:scale-105 hover:bg-teal-100 hover:text-teal-900"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button
              variant="outline"
              className="h-40 w-40 rounded-2xl border-2 border-teal-600 bg-teal-50 text-2xl font-semibold text-teal-800 shadow-lg transition-transform hover:scale-105 hover:bg-teal-100 hover:text-teal-900"
            >
              Register
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}