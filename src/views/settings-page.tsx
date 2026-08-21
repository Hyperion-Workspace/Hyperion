"use client";

import { ScrollArea, ScrollBar } from "@/components/scroll-area";
import { AiProviderCard } from "@/components/settings/ai-provider-card";

export function SettingsPage() {
  return (
    <ScrollArea className="w-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 pb-28 md:pb-4">
        <AiProviderCard />
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
