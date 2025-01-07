"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundBeams } from "../components/ui/background-beams";
import { SparklesCore } from "../components/ui/sparkles";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { TracingBeam } from "../components/ui/tracing-beam";

gsap.registerPlugin(ScrollTrigger);

const words = `Revolutionizing the future of technology with cutting-edge solutions.`;

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black/[0.96] antialiased">
        <BackgroundBeams className="opacity-50" />
        <div className="pointer-events-none absolute inset-0">
          <SparklesCore
            id="tsparticles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
        </div>
        
        <div className="relative z-10 w-full px-6 py-10 md:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="hero-text text-center">
              <h1 className="text-4xl font-bold text-white md:text-7xl lg:text-8xl">
                <TextGenerateEffect words={words} />
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative w-full bg-black">
        <div className="relative mx-auto w-full max-w-7xl">
          <section className="relative w-full py-20">
            <TracingBeam className="px-6">
              <div className="relative mx-auto max-w-2xl space-y-16 pt-4 antialiased">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="relative">
                    <h2 className="mb-4 text-2xl font-bold text-white">
                      Section {i + 1}
                    </h2>
                    <div className="prose prose-sm prose-invert text-white/70">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TracingBeam>
          </section>
        </div>
      </div>
    </div>
  );
}
