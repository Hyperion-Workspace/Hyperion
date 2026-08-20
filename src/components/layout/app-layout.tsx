"use client";

import type { ComponentType, ReactNode } from "react";
import { CommandPalette } from "@/components/common/command-palette";
import { HotkeysDialog } from "@/components/common/hotkeys-dialog";
import { ProfileDrawer } from "@/components/common/profile-drawer";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { PanelManager } from "@/components/panels/panel-manager";
import { SidebarInset, SidebarProvider } from "@/components/sidebar";
import { Toaster } from "@/components/sonner";
import { TooltipProvider } from "@/components/tooltip";
import { navigationData } from "@/config/navigation";
import { useAppHotkeys } from "@/hooks/use-app-hotkeys";
import { useWorkspaceShortcuts } from "@/hooks/use-workspace-shortcuts";

interface AppLayoutProps {
  children: ReactNode;
  LinkComponent?:
    | ComponentType<{
        href: string;
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
      }>
    | "a";
  navigate: (path: string) => void;
  pathname: string;
}

function HotkeysRegistrar({ navigate }: { navigate: (path: string) => void }) {
  useAppHotkeys({ navigate });
  useWorkspaceShortcuts();
  return null;
}

export function AppLayout({
  children,
  pathname,
  navigate,
  LinkComponent,
}: AppLayoutProps) {
  return (
    <TooltipProvider>
      <SidebarProvider className="h-screen bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <HotkeysRegistrar navigate={navigate} />
        <AppSidebar
          LinkComponent={LinkComponent}
          navigate={navigate}
          pathname={pathname}
        />
        <SidebarInset className="flex min-w-0 flex-col bg-background">
          <AppHeader LinkComponent={LinkComponent} pathname={pathname} />
          <main className="flex flex-1 flex-col overflow-hidden">
            {children}
          </main>
          <Toaster />
        </SidebarInset>
        <HotkeysDialog />
        <CommandPalette navigate={navigate} />
        <ProfileDrawer user={navigationData.user} />
        <PanelManager />
      </SidebarProvider>
    </TooltipProvider>
  );
}
