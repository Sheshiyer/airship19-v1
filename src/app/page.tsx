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
      image: "/perspectives/wisp.png",
      description: "Navigate through dimensions with a being of pure energy",
      fov: {
        horizontal: 360,
        vertical: 360,
        peripheral: 100
      },
      sensory: {
        colorPerception: {
          spectrum: "enhanced" as const,
          nightVision: true,
          infrared: true,
          ultraviolet: true
        },
        soundPerception: {
          frequencyRange: [0, 100000] as [number, number],
          echolocation: true,
          directionality: "surround" as const
        }
      },
      movement: {
        type: "ethereal" as const,
        speed: 100,
        agility: 100,
        phaseThrough: true
      },
      abilities: [
        {
          name: "Dimensional Shift",
          description: "Phase through reality barriers",
          cooldown: 5,
          energyCost: 30
        }
      ],
      elementalAffinity: {
        air: 100,
        earth: 20,
        water: 60,
        aether: 100
      },
      immersion: {
        realityDistortion: 100,
        timePerception: "dilated" as const,
        dimensionalAccess: 100,
        energySignature: "spectral" as const
      }
    },
    {
      mode: "wolf",
      image: "/perspectives/wolf.png",
      description: "Experience the raw, instinctual essence of nature",
      fov: {
        horizontal: 270,
        vertical: 180,
        peripheral: 90
      },
      sensory: {
        colorPerception: {
          spectrum: "limited" as const,
          nightVision: true,
          infrared: false,
          ultraviolet: false
        },
        soundPerception: {
          frequencyRange: [67, 45000] as [number, number],
          echolocation: false,
          directionality: "surround" as const
        }
      },
      movement: {
        type: "quadrupedal" as const,
        speed: 90,
        agility: 85,
        phaseThrough: false
      },
      abilities: [
        {
          name: "Pack Sense",
          description: "Detect and communicate with nearby entities",
          cooldown: 15,
          energyCost: 20
        }
      ],
      elementalAffinity: {
        air: 40,
        earth: 90,
        water: 50,
        aether: 30
      },
      immersion: {
        realityDistortion: 30,
        timePerception: "normal" as const,
        dimensionalAccess: 20,
        energySignature: "physical" as const
      }
    },
    {
      mode: "rabbit",
      image: "/perspectives/rabbit.png",
      description: "See the world from a perspective of constant vigilance and agility",
      fov: {
        horizontal: 340,
        vertical: 180,
        peripheral: 95
      },
      sensory: {
        colorPerception: {
          spectrum: "limited" as const,
          nightVision: true,
          infrared: false,
          ultraviolet: true
        },
        soundPerception: {
          frequencyRange: [100, 49000] as [number, number],
          echolocation: false,
          directionality: "surround" as const
        }
      },
      movement: {
        type: "quadrupedal" as const,
        speed: 95,
        agility: 100,
        phaseThrough: false
      },
      abilities: [
        {
          name: "Time Hop",
          description: "Brief moments of accelerated time perception",
          cooldown: 10,
          energyCost: 25
        }
      ],
      elementalAffinity: {
        air: 80,
        earth: 60,
        water: 40,
        aether: 50
      },
      immersion: {
        realityDistortion: 40,
        timePerception: "compressed" as const,
        dimensionalAccess: 30,
        energySignature: "physical" as const
      }
    },
    {
      mode: "pilot",
      image: "/perspectives/pilot.png",
      description: "Bridge the gap between different realities",
      fov: {
        horizontal: 180,
        vertical: 120,
        peripheral: 75
      },
      sensory: {
        colorPerception: {
          spectrum: "full" as const,
          nightVision: false,
          infrared: true,
          ultraviolet: false
        },
        soundPerception: {
          frequencyRange: [20, 20000] as [number, number],
          echolocation: false,
          directionality: "stereo" as const
        }
      },
      movement: {
        type: "bipedal" as const,
        speed: 50,
        agility: 60,
        phaseThrough: false
      },
      abilities: [
        {
          name: "Reality Anchor",
          description: "Stabilize and navigate between dimensional planes",
          cooldown: 30,
          energyCost: 50
        }
      ],
      elementalAffinity: {
        air: 60,
        earth: 40,
        water: 40,
        aether: 80
      },
      immersion: {
        realityDistortion: 70,
        timePerception: "normal" as const,
        dimensionalAccess: 90,
        energySignature: "hybrid" as const
      }
    },
  ];

  const features = [
    {
      title: "Multi-Dimensional Viewing",
      description: "Experience content through multiple viewpoints simultaneously to uncover hidden depths in every moment.",
      icon: "/file.svg",
      priority: "high" as const,
      header: "CORE FEATURE"
    },
    {
      title: "Immersive Video Experience",
      description: "Shift perspectives in real-time while watching videos to experience unique insights and emotional resonance.",
      icon: "/network-play.png",
      priority: "high" as const,
      header: "FLAGSHIP"
    },
    {
      title: "Adaptive Presentations",
      description: "Dynamic presentations that adapt to each viewer's chosen perspective for maximum impact.",
      icon: "/solids.png",
      header: "STORYTELLING"
    },
    {
      title: "Perspective Audio",
      description: "Uniquely crafted soundscapes that adapt to each perspective for deeper immersion.",
      icon: "/rocket.png",
      header: "IMMERSION"
    },
    {
      title: "Reality Bridges",
      description: "Smart linking system that maintains context as you explore different viewpoints.",
      icon: "/globe.svg",
      header: "NAVIGATION"
    },
    {
      title: "Perspective Fusion",
      description: "Blend multiple perspectives to create unique combinations of abilities and insights.",
      icon: "/window.svg",
      header: "INNOVATION"
    },
  ];

  const timelinePoints = [
    {
      title: "Phase 1: Alpha Release",
      description: "Currently in invite-only alpha phase, where selected users can experience the initial platform features and core perspective-shifting mechanics.",
    },
    {
      title: "Phase 2: VR Integration",
      description: "Expanding into virtual reality, allowing users to physically embody different perspectives and interact with the environment in immersive 3D space.",
    },
    {
      title: "Phase 3: Multiplayer Island",
      description: "Launch of the multiplayer island environment where players can interact, explore, and embark on quests together. The centerpiece will be the Oracle's temple, where players can receive mystical readings that adapt to their chosen perspective.",
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
    <main className="min-h-screen bg-gradient-to-b from-black via-indigo-950/30 to-fuchsia-950/20 antialiased text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,0,182,0.1))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,163,255,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,0,182,0.05),transparent)]" />
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
      <section id="perspectives" className="py-26 px-4 pb-40">
        <h2 className="text-4xl font-bold text-center text-white mb-10">Choose Your Perspective</h2>
        <div className="flex flex-col gap-16 items-center max-w-7xl mx-auto">
          {perspectives.map((perspective) => (
            <PerspectiveCard
              key={perspective.mode}
              mode={perspective.mode}
              image={perspective.image}
              description={perspective.description}
              active={activePerspective === perspective.mode}
              onSelect={setActivePerspective}
              fov={perspective.fov}
              sensory={perspective.sensory}
              movement={perspective.movement}
              abilities={perspective.abilities}
              elementalAffinity={perspective.elementalAffinity}
              immersion={perspective.immersion}
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
          <div className="relative z-10">
            <Meteors number={20} />
          </div>
        </HoverCard>
      </section>
    </main>
  );
}
