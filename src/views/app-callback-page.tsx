"use client";

import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-react";
import { CheckCircle2, Loader2, ShieldCheck, Terminal } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

const hasClerkPublishableKey = !!(
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim()
);

function usePortParam(): string {
  const [port, setPort] = useState("8787");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setPort(params.get("port") || "8787");
    }
  }, []);
  return port;
}

function AppCallbackWithClerk({ port }: { port: string }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { sessionId } = useAuth();
  const [transferred, setTransferred] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      if (!(isSignedIn && user)) {
        window.location.href = `/auth/app-login?port=${port}`;
        return;
      }

      const email = user.primaryEmailAddress?.emailAddress || "";
      const userId = user.id;
      const name = user.fullName || user.username || "";
      const avatar = user.imageUrl || "";

      const callbackUrl = new URL(`http://localhost:${port}/auth/callback`);
      callbackUrl.searchParams.set("session_id", sessionId || userId);
      callbackUrl.searchParams.set("user_id", userId);
      callbackUrl.searchParams.set("email", email);
      if (name) {
        callbackUrl.searchParams.set("name", name);
      }
      if (avatar) {
        callbackUrl.searchParams.set("avatar", avatar);
      }

      setTransferred(true);
      window.location.href = callbackUrl.toString();
    }
  }, [isLoaded, isSignedIn, user, sessionId, port]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 text-center text-foreground">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/3 size-[400px] rounded-full bg-emerald-500/10 blur-[130px]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center space-y-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          {transferred ? (
            <CheckCircle2 className="size-8 animate-bounce text-emerald-400" />
          ) : (
            <ShieldCheck className="size-8 animate-pulse text-emerald-400" />
          )}
        </div>

        <div className="space-y-2">
          <h1 className="font-extrabold font-sans text-2xl text-zinc-100 tracking-tight">
            {transferred ? "Session Transferred!" : "Handshake in Progress..."}
          </h1>
          <p className="mx-auto max-w-xs text-sm text-zinc-400 leading-relaxed">
            {transferred
              ? "Your session token was transmitted to local desktop app on port "
              : "Connecting to loopback listener at 127.0.0.1:"}
            <span className="font-mono font-semibold text-emerald-400">
              {port}
            </span>
            .
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-4 py-2 font-mono text-xs text-zinc-300">
          <Terminal className="size-4 text-primary" />
          <span>HTTP GET /auth/callback</span>
        </div>

        {!transferred && (
          <div className="flex items-center gap-2 font-medium text-xs text-primary">
            <Loader2 className="size-4 animate-spin" />
            <span>Transferring secure token...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AppCallbackLocalFallback({ port }: { port: string }) {
  useEffect(() => {
    const callbackUrl = new URL(`http://localhost:${port}/auth/callback`);
    callbackUrl.searchParams.set("session_id", `local-session-${Date.now()}`);
    callbackUrl.searchParams.set("user_id", `local-user-${Date.now()}`);
    callbackUrl.searchParams.set("email", "dev@hyperion.app");
    callbackUrl.searchParams.set("name", "Hyperion Developer");
    window.location.href = callbackUrl.toString();
  }, [port]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 text-center text-foreground">
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center space-y-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
          <Loader2 className="size-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <h1 className="font-extrabold font-sans text-2xl text-zinc-100 tracking-tight">
            Connecting Desktop Client...
          </h1>
          <p className="mx-auto max-w-xs text-sm text-zinc-400 leading-relaxed">
            Transferring session to local desktop app listener on port{" "}
            <span className="font-mono font-semibold text-emerald-400">
              {port}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function AppCallbackContent() {
  const port = usePortParam();

  if (hasClerkPublishableKey) {
    return (
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!.trim()}
      >
        <AppCallbackWithClerk port={port} />
      </ClerkProvider>
    );
  }

  return <AppCallbackLocalFallback port={port} />;
}

export function AppCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-950">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <AppCallbackContent />
    </Suspense>
  );
}
