"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  ChevronRight,
  Compass,
  Hammer,
  Layers3,
  Search,
  Sparkles,
} from "lucide-react";
import { builds } from "../../lib/builds";
import BuildCard from "../../components/build-card";

const categories = [
  "All builds",
  ...Array.from(new Set(builds.map((build) => build.category))).sort(),
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All builds");
  const [search, setSearch] = useState("");

  const filteredBuilds = useMemo(() => {
    return builds.filter((build) => {
      const matchesCategory =
        activeCategory === "All builds" ||
        build.category === activeCategory;

        const searchableContent = [
          build.title,
          build.description,
          build.category,
          build.difficulty,
          ...build.materials.map((material) => material.block),
        ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableContent.includes(
        search.trim().toLowerCase()
      );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-[#101713] text-[#f4f0e7]">
      <header className="site-header">
        <a href="#" className="brand">
          <div className="brand-mark">
            <Blocks size={25} strokeWidth={1.8} />
          </div>
          <span>brick<span className="brand-highlight">folio</span></span>
        </a>

        <nav className="desktop-nav">
          <a href="/builds">Explore builds</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
        </nav>

        <a href="/builds" className="header-button">
          Explore library <ArrowRight size={15} />
        </a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <Sparkles size={14} />
            YOUR NEXT BUILD STARTS HERE
          </div>

          <h1>
            Big ideas.
            <br />
            <span>One block</span> at a time.
          </h1>

          <p className="hero-description">
            Discover incredible builds, follow clear step-by-step
            guides and bring your block-built world to life.
          </p>

          <div className="hero-actions">
            <a href="#build-library" className="primary-button">
              Explore builds <ArrowRight size={17} />
            </a>
            <a href="#how-it-works" className="secondary-button">
              How it works
            </a>
          </div>

          <div className="hero-note">
            <span className="status-dot" />
            Made for builders. Built for creativity.
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-glow" />
          <div className="hero-build">
            <div className="hero-build-sky" />
            <div className="hero-mountain mountain-one" />
            <div className="hero-mountain mountain-two" />
            <div className="hero-castle">
              <div className="castle-tower tower-left" />
              <div className="castle-tower tower-right" />
              <div className="castle-wall" />
              <div className="castle-gate" />
              <div className="castle-flag">✦</div>
            </div>
            <div className="hero-build-ground" />
          </div>

          <div className="floating-card">
            <div className="floating-icon">
              <Layers3 size={19} />
            </div>
            <div>
              <strong>Build it your way</strong>
              <span>One step at a time</span>
            </div>
          </div>

          <div className="hero-caption">IMAGINE · PLAN · BUILD</div>
        </div>
      </section>

      <section className="feature-strip" id="how-it-works">
        <div className="feature-item">
          <Compass size={22} />
          <div>
            <strong>Find inspiration</strong>
            <span>Discover your next project</span>
          </div>
        </div>
        <div className="feature-item">
          <BookOpen size={22} />
          <div>
            <strong>Follow the guide</strong>
            <span>Clear, step-by-step instructions</span>
          </div>
        </div>
        <div className="feature-item">
          <Hammer size={22} />
          <div>
            <strong>Bring it to life</strong>
            <span>Build at your own pace</span>
          </div>
        </div>
      </section>

      <section className="library-section" id="build-library">
        <div className="section-heading">
          <div>
            <div className="section-kicker">THE BUILD LIBRARY</div>
            <h2>Find your next great build.</h2>
            <p>From simple starter homes to ambitious creations.</p>
          </div>
          <span className="library-count">
            {filteredBuilds.length} BUILDS
          </span>
        </div>

        <div className="library-controls">
          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-button ${
                  activeCategory === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="search-box">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search builds..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        {filteredBuilds.length > 0 ? (
          <div className="build-grid">
            {filteredBuilds.map((build) => (
              <BuildCard key={build.id} build={build} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Blocks size={30} />
            <h3>No builds found</h3>
            <p>Try another search or choose a different category.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All builds");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="community-section" id="about">
        <div className="community-icon">
          <Blocks size={27} />
        </div>
        <div>
          <div className="section-kicker">BUILT TOGETHER</div>
          <h2>A world of creativity, open to everyone.</h2>
          <p>
            Brickfolio is a community-supported project.
            Our essential building guides and tools should
            always remain accessible to everyone.
          </p>
        </div>
        <a href="#build-library" className="community-link">
          Start exploring <ChevronRight size={18} />
        </a>
      </section>

      <footer className="site-footer">
        <a href="#" className="footer-brand">
          <Blocks size={19} />
          brickfolio
        </a>
        <span>Your world. One block at a time.</span>
        <span>Independent community project · Not affiliated with Mojang or Microsoft.</span>
      </footer>
    </main>
  );
}
