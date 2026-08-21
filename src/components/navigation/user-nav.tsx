"use client";

import { useClerk, useUser } from "@clerk/clerk-react";
import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/sidebar";
import { navigationData } from "@/config/navigation";
import { useTranslations } from "@/i18n";
import { useAuthStore } from "@/stores/auth-store";
import { useNotificationStore } from "@/stores/notification-store";
import { usePanelStore } from "@/stores/panel-store";

interface UserNavUser {
  avatar: string;
  email: string;
  name: string;
}

interface UserNavProps {
  user: UserNavUser;
}

const hasClerkPublishableKey = !!(
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim()
);

function checkIsNativeApp(): boolean {
  if (
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_IS_NATIVE === "true"
  ) {
    return true;
  }
  if (
    typeof window !== "undefined" &&
    ("__TAURI__" in window ||
      "__TAURI_INTERNALS__" in window ||
      "__TAURI_POST_MESSAGE__" in window)
  ) {
    return true;
  }
  return false;
}

function UserNavBase({
  displayUser,
  onLogout,
}: {
  displayUser: UserNavUser;
  onLogout: () => void;
}) {
  const t = useTranslations("Navigation");
  const openPanel = usePanelStore((s) => s.openPanel);
  const openNotificationCenter = useNotificationStore((s) => s.setOpen);

  const handleSelect = (translationKey: string) => {
    switch (translationKey) {
      case "upgradeToPro":
        openPanel("upgrade");
        break;
      case "account":
        openPanel("account");
        break;
      case "billing":
        openPanel("billing");
        break;
      case "notifications":
        setTimeout(() => {
          openNotificationCenter(true);
        }, 150);
        break;
      case "logOut":
        onLogout();
        break;
      default:
        break;
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild={true}>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage alt={displayUser.name} src={displayUser.avatar} />
                <AvatarFallback className="rounded-lg">
                  {displayUser.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{displayUser.name}</span>
                <span className="truncate text-xs">{displayUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage
                    alt={displayUser.name}
                    src={displayUser.avatar}
                  />
                  <AvatarFallback className="rounded-lg">
                    {displayUser.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm">
                  <span className="truncate font-medium">
                    {displayUser.name}
                  </span>
                  <span className="truncate text-xs">{displayUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {navigationData.navProfile.map((group, index) => (
              <div className="contents" key={group.id}>
                <DropdownMenuGroup>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.translationKey}
                        onSelect={() => handleSelect(item.translationKey)}
                      >
                        <Icon strokeWidth={2} />
                        {t(item.translationKey as Parameters<typeof t>[0])}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
                {index < navigationData.navProfile.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function ClerkUserNav({ defaultUser }: { defaultUser: UserNavUser }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const displayUser =
    isLoaded && user
      ? {
          name: user.fullName || user.username || "User",
          email: user.primaryEmailAddress?.emailAddress || "",
          avatar: user.imageUrl,
        }
      : defaultUser;

  return <UserNavBase displayUser={displayUser} onLogout={() => signOut()} />;
}

function NativeUserNav({ defaultUser }: { defaultUser: UserNavUser }) {
  const { session, logout } = useAuthStore();

  const displayUser = session
    ? {
        name: session.name || session.email.split("@")[0] || "User",
        email: session.email,
        avatar: session.avatar || defaultUser.avatar,
      }
    : defaultUser;

  return <UserNavBase displayUser={displayUser} onLogout={() => logout()} />;
}

export function UserNav({ user: defaultUser }: UserNavProps) {
  if (!checkIsNativeApp() && hasClerkPublishableKey) {
    return <ClerkUserNav defaultUser={defaultUser} />;
  }
  return <NativeUserNav defaultUser={defaultUser} />;
}
