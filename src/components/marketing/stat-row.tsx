"use client";

import type * as React from "react";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string;
}

interface StatRowProps extends React.ComponentProps<"div"> {
  stats: StatItem[];
}

export function StatRow({ className, stats, ...props }: StatRowProps) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-8 sm:grid-cols-3", className)}
      data-slot="stat-row"
      {...props}
    >
      {stats.map((stat, i) => (
        <Reveal direction="up" duration={250} index={i} key={stat.label}>
          <div className="px-5 py-4 text-center sm:text-left">
            <p className="font-display text-mistral-ink text-stat-display">
              {stat.value}
            </p>
            <p className="mt-2 text-body-sm text-mistral-steel">{stat.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
