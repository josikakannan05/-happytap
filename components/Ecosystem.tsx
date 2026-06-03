"use client";

import { Grid3x3 } from "lucide-react";
import { ecosystemFeatures } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Ecosystem() {
  return (
    <section className="ecosystem" id="ecosystem">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <SectionLabel icon={Grid3x3}>Platform</SectionLabel>
            <h2 className="section-title">Your Complete <br/> <span>Smart Networking</span> Platform</h2>
            <p className="section-sub">
              HappyTap helps professionals, creators, founders, <br/>
              and teams connect smarter with modern digital identity tools.
            </p>
          </div>
        </Reveal>

        <div className="eco-grid">
          {ecosystemFeatures.map((feature, index) => (
            <Reveal key={feature.title} delay={60 + index * 60}>
              <div className="eco-card">
                <div className="eco-img-wrap">
                  <img src={feature.image} alt={feature.title} className="eco-img" draggable={false} />
                </div>
                <div className="eco-card-body">
                  <div className="icon-box icon-box-purple">
                    <feature.icon className="icon" aria-hidden />
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
