"use client";

import { Users } from "lucide-react";
import { brandItems } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Brands() {
  const items = [...brandItems, ...brandItems];

  return (
    <section className="brands">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <SectionLabel icon={Users}>Trusted worldwide</SectionLabel>
            <h2 className="section-title">Used by modern professionals.</h2>
            <p className="section-sub">
              Founders, creators, agencies, and enterprises are replacing
              outdated networking with HappyTap.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="marquee">
            <div className="marquee-track">
              {items.map((item, index) => (
                <div key={`${item.label}-${index}`} className="brand-item">
                  <item.icon className="icon" aria-hidden />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
