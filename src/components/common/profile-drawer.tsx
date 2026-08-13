"use client";

import {
  navigationData,
  type UserNavItem,
} from "@/config/navigation";
import { useDrawerHistory } from "@/hooks/use-drawer-history";
import { useNotificationStore } from "@/stores/notification-store";
import { usePanelStore } from "@/stores/panel-store";
import { useProfileDrawerStore } from "@/stores/profile-drawer-store";
import { useTranslations } from "@/i18n";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/avatar";
import { Button } from "@/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/drawer";
import { Separator } from "@/components/separator";

interface ProfileDrawerProps {
  user: UserNavItem;
}

export function ProfileDrawer({ user }: ProfileDrawerProps) {
  const { isOpen, setOpen } = useProfileDrawerStore();
  useDrawerHistory(isOpen, setOpen);
  const t = useTranslations("Navigation");
  const openPanel = usePanelStore((s) => s.openPanel);
  const openNotificationCenter = useNotificationStore((s) => s.setOpen);

  const handleSelect = (translationKey: string) => {
    setOpen(false);

    // Map translation keys to panel states
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
        // Delay opening to prevent layout/focus collisions with closing mobile Drawer
        setTimeout(() => {
          openNotificationCenter(true);
        }, 150);
        break;
      default:
        break;
    }
  };

  return (
    <Drawer onOpenChange={setOpen} open={isOpen}>
      <DrawerContent className="p-2">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{t("account")}</DrawerTitle>
          <DrawerDescription>{user.name}</DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center gap-2 px-2 py-1.5 text-left">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage alt={user.name} src={user.avatar} />
            <AvatarFallback className="rounded-lg">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
        <Separator className="my-1 h-px bg-border" />
        <div className="flex flex-col">
          {navigationData.navProfile.map((group, index) => (
            <div className="contents" key={group.id}>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    className="justify-start"
                    key={item.translationKey}
                    onClick={() => handleSelect(item.translationKey)}
                    variant="ghost"
                  >
                    <Icon strokeWidth={2} />
                    {t(item.translationKey as Parameters<typeof t>[0])}
                  </Button>
                );
              })}
              {index < navigationData.navProfile.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
