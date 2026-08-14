"use client";

import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";
import type * as React from "react";

interface TestimonialProps extends React.ComponentProps<"div"> {
  author: string;
  company?: string;
  quote: string;
  role?: string;
}

export function TestimonialCard({
  className,
  quote,
  author,
  role,
  company,
  ...props
}: TestimonialProps) {
  return (
    <Reveal direction="up" duration={300}>
      <div
        className={cn(
          "rounded-xl border border-mistral-hairline-soft bg-mistral-canvas p-8 transition-shadow duration-200 hover:shadow-mistral-level-2",
          className
        )}
        data-slot="testimonial-card"
        {...props}
      >
        <blockquote className="text-body-md text-mistral-ink leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-6">
          <p className="text-body-sm-medium text-mistral-ink">{author}</p>
          {(role || company) && (
            <p className="text-body-sm text-mistral-steel">
              {[role, company].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}
