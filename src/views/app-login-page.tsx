"use client";

import { ClerkProvider, SignIn, useUser } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Laptop,
  Loader2,
  Lock,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";

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

function HeroShowcase({ port }: { port: string }) {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden border-border/40 border-r bg-zinc-950/60 p-10 lg:flex lg:w-1/2 xl:p-14">
      {/* Dynamic ambient gradient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[600px] rounded-full bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[500px] rounded-full bg-emerald-500/10 blur-[140px]" />

      {/* Top Header Logo */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-inner">
            <Terminal className="size-5" />
          </div>
          <span className="font-bold font-sans text-xl text-foreground tracking-tight">
            Hyperion
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400 text-xs backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono font-medium">127.0.0.1:{port} Ready</span>
        </div>
      </div>

      {/* Middle Content */}
      <div className="relative z-10 my-auto max-w-lg space-y-8 py-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-semibold text-primary text-xs backdrop-blur-md">
            <Zap className="size-3.5" />
            <span>Secure Loopback Auth Handshake</span>
          </div>
          <h1 className="font-extrabold font-sans text-4xl text-foreground tracking-tight leading-tight sm:text-5xl">
            Universal Workspace & Terminal Execution.
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Authenticating via web seamlessly transfers your session token
            directly to your local desktop client. No manual keys required.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 backdrop-blur-md">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Lock className="size-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-200">
                End-to-End Guard
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Encrypted storage directly on your local OS keystore.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 backdrop-blur-md">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Cpu className="size-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-200">
                Native IPC Sync
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Instant UI state update over 127.0.0.1 loopback.
              </p>
            </div>
          </div>
        </div>

        {/* Connection Status Card */}
        <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-5 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-medium text-zinc-300">
              Loopback Listener Endpoint
            </span>
            <span className="font-mono text-emerald-400">HTTP GET 200</span>
          </div>
          <div className="mt-3 font-mono text-sm text-zinc-200">
            http://127.0.0.1:{port}/auth/callback
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 flex items-center justify-between text-xs text-zinc-500">
        <span>© Hyperion Architecture</span>
        <div className="flex items-center gap-4">
          <span className="hover:text-zinc-300">Privacy Policy</span>
          <span className="hover:text-zinc-300">Security Specs</span>
        </div>
      </div>
    </div>
  );
}

function AppLoginWithClerk({ port }: { port: string }) {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = `/auth/app-callback?port=${port}`;
    }
  }, [isLoaded, isSignedIn, port]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-foreground">
      <HeroShowcase port={port} />

      {/* Right Login Form Container */}
      <div className="relative flex flex-1 flex-col justify-center px-6 py-12 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-semibold text-primary text-xs lg:hidden">
              <Laptop className="size-4" />
              <span>Desktop App Auth</span>
            </div>
            <h2 className="font-bold font-sans text-3xl text-zinc-100 tracking-tight sm:text-4xl">
              Sign In to Hyperion
            </h2>
            <p className="text-sm text-zinc-400">
              Complete authentication below to connect your session to desktop
              client on port {port}.
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <SignIn
              appearance={{
                baseTheme: dark,
                variables: {
                  colorBackground: "#09090b",
                  colorText: "#f4f4f5",
                  colorTextSecondary: "#a1a1aa",
                  colorInputBackground: "#18181b",
                  colorInputText: "#f4f4f5",
                },
                elements: {
                  card: "bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md",
                  headerTitle: "text-zinc-100 font-bold text-xl font-sans",
                  headerSubtitle: "text-zinc-400 text-sm",
                  socialButtonsBlockButton:
                    "border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-800/80 text-zinc-100 font-medium rounded-2xl transition-all py-2.5",
                  formButtonPrimary:
                    "bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-all shadow-lg py-3 text-sm",
                  formFieldInput:
                    "bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:ring-2 focus:ring-primary/20 px-4 py-2.5 transition-all",
                },
              }}
              fallbackRedirectUrl={`/auth/app-callback?port=${port}`}
              forceRedirectUrl={`/auth/app-callback?port=${port}`}
              routing="hash"
              signUpForceRedirectUrl={`/auth/app-callback?port=${port}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppLoginLocalFallback({ port }: { port: string }) {
  const [email, setEmail] = useState("dev@hyperion.app");
  const [name, setName] = useState("Hyperion Developer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sessionId = `local-session-${Date.now()}`;
    const userId = `user-${Date.now().toString(36)}`;
    const callbackUrl = new URL(`http://localhost:${port}/auth/callback`);
    callbackUrl.searchParams.set("session_id", sessionId);
    callbackUrl.searchParams.set("user_id", userId);
    callbackUrl.searchParams.set("email", email);
    if (name) {
      callbackUrl.searchParams.set("name", name);
    }

    window.location.href = callbackUrl.toString();
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-foreground">
      <HeroShowcase port={port} />

      {/* Right Login Form Container */}
      <div className="relative flex flex-1 flex-col justify-center px-6 py-12 lg:px-12 xl:px-16">
        {/* Ambient subtle glow background for mobile/form side */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]" />

        <div className="relative z-10 mx-auto w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-semibold text-primary text-xs">
              <ShieldCheck className="size-4" />
              <span>Hyperion Web Authentication</span>
            </div>
            <h2 className="font-extrabold font-sans text-3xl text-zinc-100 tracking-tight sm:text-4xl">
              Connect Desktop Client
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Enter your session details to complete the local authentication
              handshake on port{" "}
              <span className="font-mono font-medium text-emerald-400">
                {port}
              </span>
              .
            </p>
          </div>

          {/* Premium Form Card */}
          <form
            className="space-y-5 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-7 shadow-2xl backdrop-blur-2xl sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <Label
                className="font-medium text-xs text-zinc-300 uppercase tracking-wider"
                htmlFor="email"
              >
                Developer Email
              </Label>
              <div className="relative">
                <Input
                  className="h-11 rounded-xl border-zinc-800/80 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dev@hyperion.app"
                  required
                  type="email"
                  value={email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                className="font-medium text-xs text-zinc-300 uppercase tracking-wider"
                htmlFor="name"
              >
                Display Name
              </Label>
              <Input
                className="h-11 rounded-xl border-zinc-800/80 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:ring-2 focus:ring-primary/20"
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Hyperion Developer"
                type="text"
                value={name}
              />
            </div>

            <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/50 p-3.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2 font-medium text-zinc-300">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>Handshake Protocol: HTTP GET</span>
              </div>
              <p className="mt-1 text-zinc-500">
                Redirects to http://localhost:{port}/auth/callback upon
                confirmation.
              </p>
            </div>

            <Button
              className="h-12 w-full gap-2 rounded-xl bg-primary font-semibold text-primary-foreground text-sm shadow-xl transition-all hover:opacity-90 active:scale-[0.99]"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Connecting to Desktop Client...
                </>
              ) : (
                <>
                  <span>Authenticate & Connect Desktop App</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer security note */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-zinc-500">
            <Lock className="size-3.5" />
            <span>Secure 127.0.0.1 loopback transfer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppLoginContent() {
  const port = usePortParam();

  if (hasClerkPublishableKey) {
    return (
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!.trim()}
      >
        <AppLoginWithClerk port={port} />
      </ClerkProvider>
    );
  }

  return <AppLoginLocalFallback port={port} />;
}

export function AppLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-950">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <AppLoginContent />
    </Suspense>
  );
}
