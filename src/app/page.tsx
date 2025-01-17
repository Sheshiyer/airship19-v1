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
import { BlogPreview } from "../components/ui/blog-preview";
import { CommunityShowcase } from "../components/ui/community-showcase";
import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "../lib/utils";
import { AuthModal } from "../components/ui/auth-modal";
import { WalletModal } from "../components/ui/wallet-modal";
import { WalletStatus } from "../components/ui/wallet-status";
import { useWallet } from "../context/wallet-context";
import { Footer } from "../components/ui/footer";

export default function Home() {
  const [activePerspective, setActivePerspective] = useState("wisp");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { isConnected } = useWallet();

  const handleOpenAuthModal = useCallback((mode: "login" | "signup" | "wallet") => {
    if (mode === "wallet") {
      setIsWalletModalOpen(true);
    } else {
      setAuthModalMode(mode);
      setIsAuthModalOpen(true);
    }
  }, []);

  const mainNavItems = [
    { id: "home", label: "Home" },
    { id: "perspectives", label: "Perspectives" },
    { id: "features", label: "Features" },
    { id: "timeline", label: "Timeline" },
    { id: "community", label: "Community" },
    { id: "blog", label: "Blog" },
    { id: "faq", label: "FAQ" }
  ];

  const actionNavItems = [
    { id: "signin", label: "Sign In", isAuth: true },
    { id: "connect-wallet", label: "Connect Wallet", isAuth: true, isPrimary: true },
    { id: "marketplace", label: "NFTify", href: "https://nftify.network/marketplace" }
  ];

  const perspectives = [
    {
      mode: "wisp",
      image: "/perspectives/wisp.png",
      description: "Transcend physical boundaries as a being of pure energy, perceiving reality through quantum vibrations and dimensional rifts. Master the art of ethereal movement and witness the universe's hidden frequencies.",
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
      description: "Embrace primal instincts and pack mentality. See the world through heightened senses, where every scent tells a story and every sound reveals hidden truths about the natural order.",
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
      description: "Experience hypervigilance and lightning reflexes. Process time differently as your enhanced awareness reveals split-second opportunities and escape routes others might miss.",
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
      description: "Navigate the convergence of realities as a dimensional wayfinder. Your unique human perspective allows you to bridge gaps between different planes of existence.",
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
    }
  ];

  const features = [
    {
      title: "Witness System",
      description: "Join our revolutionary decentralized network of reality observers. Validate and authenticate multi-dimensional experiences, earning rewards while maintaining the integrity of cross-reality interactions.",
      icon: "/file.svg",
      priority: "high" as const,
      header: "CORE FEATURE"
    },
    {
      title: "Daily Perspective Raffle",
      description: "Every day brings new possibilities. Participate in our unique raffle system to win exclusive NFTs and rare perspective combinations that unlock unprecedented ways of experiencing digital content.",
      icon: "/network-play.png",
      priority: "high" as const,
      header: "COMMUNITY"
    },
    {
      title: "Shard Mechanics",
      description: "Discover, collect, and combine perspective shards to forge entirely new ways of perceiving reality. Each shard holds a fragment of unique abilities and sensory experiences waiting to be unlocked.",
      icon: "/solids.png",
      priority: "high" as const,
      header: "GAMEPLAY"
    },
    {
      title: "Multi-Dimensional Viewing",
      description: "Break free from single-perspective limitations. Our groundbreaking technology allows you to experience content through multiple viewpoints simultaneously, revealing hidden depths and connections.",
      icon: "/rocket.png",
      header: "IMMERSION"
    },
    {
      title: "Reality Bridges",
      description: "Navigate seamlessly between different perspectives with our advanced context preservation system. Maintain your understanding and insights as you traverse various dimensional viewpoints.",
      icon: "/globe.svg",
      header: "NAVIGATION"
    },
    {
      title: "Perspective Fusion",
      description: "Push the boundaries of perception by combining different perspectives. Create unique hybrid viewpoints that offer unprecedented ways to experience and interact with digital content.",
      icon: "/window.svg",
      header: "INNOVATION"
    }
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
    }
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
    }
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
      <section id="home" className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center z-10">
          <TypewriterEffect
            words={[
              { text: "Transcend" },
              { text: "Reality" },
              { text: "Through" },
              { text: "Multiple" },
              { text: "Dimensions", className: "text-blue-500" },
            ]}
          />
          <p className="text-neutral-200 mt-4 max-w-lg text-center text-lg mb-8">
            Step into a revolutionary platform where reality bends to your will. Experience stories, art, and digital content through multiple dimensional perspectives, each offering unique insights and abilities.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 mt-2">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
              <span>Begin Your Transformation</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="px-6 py-3 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors flex items-center gap-2">
              <span>Experience the Shift</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Perspective Showcase Carousel */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="relative w-[800px] h-[800px]">
            {perspectives.map((perspective, index) => {
              const angle = (index * 360) / perspectives.length;
              const radius = 300;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              
              return (
                <div
                  key={perspective.mode}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  <Image
                    src={perspective.image}
                    alt={perspective.mode}
                    width={200}
                    height={200}
                    className="w-32 h-32 object-contain filter brightness-75"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <FloatingNav>
        {/* Main Navigation */}
        <div className="flex items-center gap-8">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-label={`Navigate to ${item.label} section`}
              role="menuitem"
              className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Action Navigation */}
        <div className="flex items-center gap-4 ml-8 pl-8 border-l border-white/10">
          {actionNavItems.map((item) => {
            if (item.isAuth) {
              if (item.id === "connect-wallet" && isConnected) {
                return <WalletStatus key={item.id} />;
              }
              
              if (item.id === "signin" && isConnected) {
                return null;
              }

              return (
                <button
                  key={item.id}
                  onClick={() => item.id === "connect-wallet" ? setIsWalletModalOpen(true) : handleOpenAuthModal("login")}
                  aria-label={item.label}
                  role="menuitem"
                  className={cn(
                    "text-sm font-space-grotesk font-medium transition-colors flex items-center gap-2 px-4 py-1.5 rounded-lg",
                    item.isPrimary
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "text-neutral-300 hover:text-white border border-white/10 hover:border-white/20"
                  )}
                >
                  {item.label}
                  {item.isPrimary && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  )}
                </button>
              );
            }
            
            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${item.label} (opens in new tab)`}
                  className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                </a>
              );
            }
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Navigate to ${item.label} section`}
                role="menuitem"
                className="text-sm font-space-grotesk font-medium text-neutral-300 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
              </button>
            );
          })}
        </div>
      </FloatingNav>

      {/* Perspectives Section */}
      <section id="perspectives" className="py-26 pb-40">
        <h2 className="text-4xl font-bold text-center text-white mb-10">Choose Your Perspective</h2>
        <div className="flex flex-col gap-16 items-center">
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

      {/* Community Section */}
      <section id="community" className="py-26 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Community Achievements</h2>
          <p className="text-neutral-300 text-center mb-10 text-lg max-w-2xl mx-auto">
            Join our growing community of perspective explorers and unlock unique achievements
          </p>
          <CommunityShowcase
            stats={{
              totalMembers: 15234,
              activeToday: 1893,
              perspectivesShared: 45678,
              witnessCount: 12456
            }}
            achievements={[
              {
                title: "Dimensional Pioneer",
                description: "First to discover and validate a new perspective combination",
                icon: "/perspectives/wisp.png",
                rarity: "legendary",
                count: 85
              },
              {
                title: "Reality Weaver",
                description: "Successfully blend 10 different perspective shards",
                icon: "/perspectives/wolf.png",
                rarity: "epic",
                count: 65
              },
              {
                title: "Trusted Witness",
                description: "Validate 100 perspective experiences in the witness network",
                icon: "/perspectives/pilot.png",
                rarity: "rare",
                count: 45
              }
            ]}
          />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-26 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Latest Updates</h2>
          <p className="text-neutral-300 text-center mb-10 text-lg max-w-2xl mx-auto">
            Explore our latest articles, insights, and community highlights
          </p>
          <BlogPreview
            posts={[
              {
                title: "Introducing Multi-Perspective NFTs",
                excerpt: "Discover how our unique NFT technology enables viewing digital art from multiple dimensional perspectives.",
                date: "March 15, 2024",
                category: "Technology",
                image: "/perspectives/wisp.png"
              },
              {
                title: "Community Spotlight: Top Creators",
                excerpt: "Meet the innovative creators pushing the boundaries of multi-dimensional art in our community.",
                date: "March 12, 2024",
                category: "Community",
                image: "/perspectives/wolf.png"
              },
              {
                title: "The Future of Digital Experiences",
                excerpt: "How perspective-shifting technology is revolutionizing the way we interact with digital content.",
                date: "March 10, 2024",
                category: "Innovation",
                image: "/perspectives/pilot.png"
              }
            ]}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-26 px-4">
        <EvervaultCard className="max-w-4xl mx-auto p-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Frequently Asked Questions</h2>
          <InfiniteMovingCards items={faqs} />
        </EvervaultCard>
      </section>

      {/* CTA Section */}
      <section className="py-26 px-4 pb-0">
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

      {/* Footer */}
      <Footer
        socialLinks={[
          {
            platform: "Twitter",
            url: "https://twitter.com/airship19",
            icon: "/file.svg"
          },
          {
            platform: "Discord",
            url: "https://discord.gg/airship19",
            icon: "/globe.svg"
          },
          {
            platform: "GitHub",
            url: "https://github.com/airship19",
            icon: "/window.svg"
          }
        ]}
        navLinks={[
          {
            section: "Platform",
            links: [
              { label: "Features", href: "#features" },
              { label: "Perspectives", href: "#perspectives" },
              { label: "Timeline", href: "#timeline" },
              { label: "Blog", href: "#blog" }
            ]
          },
          {
            section: "Community",
            links: [
              { label: "NFT Marketplace", href: "https://nftify.network/marketplace" },
              { label: "Achievements", href: "#community" },
              { label: "FAQ", href: "#faq" },
              { label: "Support", href: "#support" }
            ]
          }
        ]}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </main>
  );
}
