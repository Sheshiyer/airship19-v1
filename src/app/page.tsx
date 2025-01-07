"use client";

import { BackgroundBeams } from "../components/ui/background-beams";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { FloatingNav } from "../components/ui/floating-nav";
import { PerspectiveCard } from "../components/ui/perspective-card";
import { TracingBeam } from "../components/ui/tracing-beam";
import { EvervaultCard } from "../components/ui/evervault-card";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { HoverCard } from "../components/ui/hover-card";
import { Meteors } from "../components/ui/meteors";
import { BentoGrid } from "../components/ui/bento-grid";
import { useState } from "react";

export default function Home() {
  const [activePerspective, setActivePerspective] = useState("wisp");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "perspectives", label: "Perspectives" },
    { id: "features", label: "Features" },
    { id: "timeline", label: "Timeline" },
    { id: "faq", label: "FAQ" }
  ];

  const perspectives = [
    {
      mode: "wisp",
      image: "/wisp-p.png",
      description: "Navigate through dimensions with a being of pure energy",
    },
    {
      mode: "wolf",
      image: "/wolf-p.png",
      description: "Experience the raw, instinctual essence of nature"    
    },
    {
      mode: "rabbit",
      image: "/rabbit-p.png",
      description: "See the world from a perspective of constant vigilance and agility",
    },
    {
      mode: "pilot",
      image: "/pilot-p.png",
      description: "Bridge the gap between different realities"
    },
  ];

  const features = [
    {
      title: "Multi-Dimensional Viewing",
      description: "Transform your understanding by experiencing content through multiple perspectives simultaneously. Switch seamlessly between the ethereal Wisp, primal Wolf, vigilant Rabbit, and grounded Pilot viewpoints to uncover hidden depths in every moment.",
      icon: "/file.svg",
      priority: "high" as const,
      header: "CORE FEATURE"
    },
    {
      title: "Immersive Video Experience",
      description: "Dive deep into stories with our revolutionary video player that lets you shift perspectives in real-time. Each viewpoint offers unique insights, emotional resonance, and hidden details that create a truly multi-layered narrative experience.",
      icon: "/network-play.png",
      priority: "high" as const,
      header: "FLAGSHIP"
    },
    {
      title: "Adaptive Presentations",
      description: "Create dynamic slideshows that morph based on the viewer's chosen perspective. Perfect for educational content, storytelling, and presentations that need to resonate with diverse audiences.",
      icon: "/solids.png",
      header: "STORYTELLING"
    },
    {
      title: "Perspective Audio",
      description: "Experience uniquely crafted soundscapes that adapt to each perspective. From the ethereal whispers of the Wisp to the primal rhythms of the Wolf, audio becomes a gateway to deeper immersion.",
      icon: "/rocket.png",
      header: "IMMERSION"
    },
    {
      title: "Reality Bridges",
      description: "Navigate seamlessly between perspectives with our smart linking system. Maintain context and continuity as you explore different viewpoints, creating a coherent multi-dimensional experience.",
      icon: "/globe.svg",
      header: "NAVIGATION"
    },
    {
      title: "Perspective Fusion",
      description: "Unlock new ways of seeing by blending multiple perspectives. Combine the Wisp's ethereal vision with the Wolf's instincts, or merge the Rabbit's vigilance with the Pilot's overview.",
      icon: "/window.svg",
      header: "INNOVATION"
    },
  ];

  const timelinePoints = [
    {
      title: "Phase 1: Awakening",
      description: "Initial perspective shifts begin as users discover new ways of seeing.",
    },
    {
      title: "Phase 2: Convergence",
      description: "Different viewpoints start connecting, creating a richer understanding.",
    },
    {
      title: "Phase 3: Harmony",
      description: "Achievement of a unified multi-perspective experience.",
    },
  ];

  const faqs = [
    {
      title: "What is multi-perspective viewing?",
      content: "Experience content through different lenses - from the ethereal Wisp to the grounded human Pilot.",
    },
    {
      title: "How do I switch perspectives?",
      content: "Simply select your desired perspective card to shift your viewing experience.",
    },
    {
      title: "Can I combine perspectives?",
      content: "Future updates will enable perspective blending for unique viewing experiences.",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased text-gray-100">
      <BackgroundBeams />
      
      {/* Hero Section */}
      <section id="home" className="h-screen flex flex-col items-center justify-center">
        <TypewriterEffect
          words={[
            { text: "Experience" },
            { text: "Reality" },
            { text: "Through" },
            { text: "Multiple" },
            { text: "Lenses", className: "text-blue-500" },
          ]}
        />
        <p className="text-neutral-200 mt-4 max-w-lg text-center text-lg">
          Dive into a world where perspectives shift and stories unfold through different eyes
        </p>
      </section>

      {/* Navigation */}
      <FloatingNav>
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>
      </FloatingNav>

      {/* Perspectives Section */}
      <section id="perspectives" className="py-26 px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-10">Choose Your Perspective</h2>
        <div className="flex flex-wrap gap-8 justify-center max-w-7xl mx-auto">
          {perspectives.map((perspective) => (
            <PerspectiveCard
              key={perspective.mode}
              mode={perspective.mode}
              image={perspective.image}
              description={perspective.description}
              active={activePerspective === perspective.mode}
              onSelect={setActivePerspective}
              character={perspective.character}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-26">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Platform Features</h2>
          <p className="text-neutral-300 text-center mb-10 text-lg max-w-2xl mx-auto">
            Discover a suite of innovative tools designed to transform how you experience and share content across multiple perspectives.
          </p>
          <BentoGrid items={features} />
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-26 px-4">
        <TracingBeam className="max-w-4xl mx-auto">
          {timelinePoints.map((point, index) => (
            <div key={index} className="mb-20">
              <h3 className="text-2xl font-bold text-white mb-4">{point.title}</h3>
              <p className="text-neutral-200 text-lg">{point.description}</p>
            </div>
          ))}
        </TracingBeam>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-26 px-4">
        <EvervaultCard className="max-w-4xl mx-auto p-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Frequently Asked Questions</h2>
          <InfiniteMovingCards items={faqs} />
        </EvervaultCard>
      </section>

      {/* CTA Section */}
      <section className="py-26 px-4">
        <HoverCard className="max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold text-center mb-4 text-white">Ready to see the world anew?</h2>
          <p className="text-center mb-8 text-neutral-200">Join us in exploring reality through different eyes</p>
          <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
            Get Started
          </button>
          <Meteors number={20} />
        </HoverCard>
      </section>
    </main>
  );
}
