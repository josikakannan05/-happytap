"use client";

import { Layers } from "lucide-react";
import { products } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Products() {
  return (
    <section className="products" id="products">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <SectionLabel icon={Layers}>Products</SectionLabel>
            <h2 className="section-title">Crafted for modern professionals.</h2>
          </div>
        </Reveal>

        <div className="product-row">
          {products.map((product, index) => (
            <Reveal key={product.title} delay={60 + index * 60}>
              <div className="product-card">
                <div className="product-overlay" />
                
                <div className="product-img-wrap">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-img"
                    draggable={false}
                  />
                </div>

                <span className="product-tag">
                  <product.icon className="icon" aria-hidden />
                  {product.tag}
                </span>

                <div className="product-info">
                  <div className="product-text">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
