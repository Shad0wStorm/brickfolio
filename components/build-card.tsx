
import Link from "next/link";
import { Clock3, ArrowUpRight } from "lucide-react";
import type { Build } from "../lib/builds";

export default function BuildCard({ build }: { build: Build }) {
  return (
    <Link href={`/builds/${build.slug}`} className="build-card-link">
      <article className="build-card">
        <div className={`artwork artwork-${build.accent}`}>
          <div className="artwork-glow" />
          <div className="artwork-scene">
            <div className="art-block art-block-back" />
            <div className="art-block art-block-left" />
            <div className="art-block art-block-right" />
            <div className="art-block art-block-centre" />
            <div className="art-block art-block-top" />
            <div className="art-block art-block-detail" />
            <div className="art-ground" />
          </div>
          <div className="artwork-label">
            BUILD PREVIEW
          </div>
          <span className="build-open-icon">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div className="build-card-content">
          <div className="build-card-meta">
            <span>{build.category}</span>
            <span>{build.size} build</span>
          </div>

          <h3>{build.title}</h3>
          <p>{build.description}</p>

          <div className="build-card-footer">
            <span>
              <Clock3 size={14} />
              {build.estimatedTime}
            </span>
            <span>{build.difficulty}</span>
          </div>

          <div className="build-materials">
            {build.materials.length} material types
          </div>
        </div>
      </article>
    </Link>
  );
}
