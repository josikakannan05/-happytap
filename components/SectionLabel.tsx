"use client";

import type { LucideIcon } from "lucide-react";

type SectionLabelProps = {
  icon: LucideIcon;
  children: React.ReactNode;
};

export function SectionLabel({ icon: Icon, children }: SectionLabelProps) {
  return (
    <span className="section-label">
      <Icon className="icon" aria-hidden />
      {children}
    </span>
  );
}
