"use client";

import { TerminalGrid } from "@/components/terminal/terminal-grid";

export function TerminalsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TerminalGrid />
    </div>
  );
}
