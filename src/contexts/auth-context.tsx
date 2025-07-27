"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "@/components/logo";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

/**
 * A full-page loading indicator shown while Firebase checks auth status.
 */
function AppLoader() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50">
      <div className="flex items-center gap-2">
        <Logo className="h-10 w-auto animate-pulse text-primary" />
      </div>
      <p className="mt-4 text-muted-foreground">Loading Medfriend...</p>
    </div>
  );
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Don't run any redirect logic until Firebase has checked the auth state.
    if (loading) {
      return;
    }

    const isAuthPage = ["/", "/login", "/signup"].includes(pathname);

    // If the user is logged out and trying to access a protected page
    if (!user && !isAuthPage) {
      router.push("/");
    }
    // If the user is logged in and trying to access an authentication page
    else if (user && isAuthPage) {
      router.push("/dashboard");
    }
  }, [user, loading, router, pathname]);

  // By showing a loader while `loading` is true, we prevent child pages
  // from rendering prematurely and causing incorrect redirects.
  if (loading) {
    return <AppLoader />;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};