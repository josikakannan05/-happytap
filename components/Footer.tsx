"use client";

import Link from "next/link";
import { Contact, Instagram, Linkedin, Twitter } from "lucide-react";
import {
  footerCompanyLinks,
  footerProductLinks,
} from "@/lib/data";
import { Reveal } from "./Reveal";

const socialFooterLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer>
      <div className="container">
        <Reveal>
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="logo-mark">
                <Contact className="icon" aria-hidden />
              </div>
              HappyTap
            </div>
            <p className="footer-text">
              The modern professional identity platform redefining how people
              connect in a digital-first world.
            </p>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            {footerProductLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <link.icon className="icon" aria-hidden />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            {footerCompanyLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <link.icon className="icon" aria-hidden />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Social</h4>
            {socialFooterLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <link.icon className="icon" aria-hidden />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        </Reveal>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} HappyTap. All rights reserved.</span>
          <span>Built for the digital-first professional.</span>
        </div>
      </div>
    </footer>
  );
}
