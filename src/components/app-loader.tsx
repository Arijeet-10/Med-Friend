import { Logo } from "./logo";

export function AppLoader() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full flex-col items-center justify-center bg-slate-50">
      <div className="flex items-center gap-2">
        <Logo className="h-10 w-auto animate-pulse text-primary" />
      </div>
      <p className="mt-4 text-muted-foreground">Loading Patient Data...</p>
    </div>
  );
}