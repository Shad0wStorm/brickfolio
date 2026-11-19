
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Blocks } from "lucide-react";
import { builds } from "../../../lib/builds";
import BuildCard from "../../../components/build-card";

const categories = [
  "All builds",
  "Medieval",
  "Starter",
  "Survival",
  "Fantasy",
];

export default function BuildsPage() {
  const [category, setCategory] = useState("All builds");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All difficulties");

  const filteredBuilds = useMemo(() => {
    return builds.filter((build) => {
      const matchesCategory =
        category === "All builds" || build.category === category;

      const matchesDifficulty =
        difficulty === "All difficulties" ||
        build.difficulty === difficulty;

      const matchesSearch =
        `${build.title} ${build.description} ${build.category}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [category, difficulty, search]);

  return (
    <main className="min-h-screen bg-[#101713] text-[#f4f0e7]">
      <header className="site-header">
        <Link href="/" className="brand">
          <div className="brand-mark">
            <Blocks size={25} />
          </div>
          <span>
            brick<span className="brand-highlight">folio</span>
          </span>
        </Link>

        <Link href="/" className="header-button">
          <ArrowLeft size={15} />
          Back home
        </Link>
      </header>

      <section className="library-section">
        <div className="section-kicker">THE BUILD LIBRARY</div>
        <h1 className="catalogue-title">Explore the collection.</h1>
        <p className="catalogue-description">
          Find inspiration, discover new ideas and plan your next creation.
        </p>

        <div className="library-controls">
          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`category-button ${
                  category === item ? "active" : ""
                }`}
              >
                {item}
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

        <div className="catalogue-extra-filters">
          <label>
            Difficulty
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option>All difficulties</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </label>

          <span>{filteredBuilds.length} builds found</span>
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
            <p>Try changing your search or filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All builds");
                setDifficulty("All difficulties");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
