"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FooterProps {
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
  navLinks: {
    section: string;
    links: {
      label: string;
      href: string;
    }[];
  }[];
}

export const Footer = ({ socialLinks, navLinks }: FooterProps) => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
  };

  return (
    <footer className="relative bg-black/40 backdrop-blur-sm border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Newsletter */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white">airship<span className="text-blue-500">19</span></h3>
              <p className="mt-2 text-neutral-400 max-w-sm">
                Experience reality through multiple perspectives and unlock new dimensions of digital content.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Join Our Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Quick Navigation */}
          {navLinks.map((section) => (
            <div key={section.section}>
              <h4 className="text-lg font-medium text-white mb-4">{section.section}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-400 text-sm">
              © 2024 Airship19. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={link.icon}
                    alt={link.platform}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
