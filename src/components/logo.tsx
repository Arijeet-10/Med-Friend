import { cn } from "@/lib/utils";
import React from "react";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("text-primary", className)}
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id="logo-gradient-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#a7f3d0" />
        </linearGradient>
      </defs>
      {/* <!-- Cross --> */}
      <path
        fill="url(#logo-gradient-1)"
        d="M62.5,12.5h-25v25h-25v25h25v25h25v-25h25v-25h-25v-25Z"
        opacity="0.8"
      />
      {/* <!-- Stethoscope --> */}
      <path
        fill="url(#logo-gradient-2)"
        stroke="currentColor"
        strokeWidth="3"
        d="M50,45 C40,30,25,35,25,50 C25,70,50,85,50,85 C50,85,75,70,75,50 C75,35,60,30,50,45Z"
        transform="translate(-25, -15) scale(0.9)"
      />
       <path
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 55 58 C 65 75, 75 75, 80 70 C 90 60, 90 40, 75 30"
      />
       <path
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 22 30 C 7 40, 7 60, 20 70 C 25 75, 35 75, 45 58"
      />
      <circle cx="22" cy="23" r="5" fill="currentColor" />
      <circle cx="78" cy="23" r="5" fill="currentColor" />
    </svg>
  );
}



