"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed. User:", user?.email);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(`Auth-Context useEffect triggered. Loading: ${loading}, Pathname: ${pathname}, User: ${user?.email}`);
    if (loading) {
      console.log("Auth context is still loading, skipping redirect logic.");
      return;
    }

    const isAuthPage = ['/', '/signup'].includes(pathname);

    if (!user && !isAuthPage) {
      console.log("User not found and not on auth page, redirecting to /");
      router.push("/");
    } else if (user && isAuthPage) {
      console.log("User is on auth page, redirecting to /dashboard");
      router.push("/dashboard");
    } else {
       console.log("No redirect condition met.");
    }
  }, [user, loading, router, pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
