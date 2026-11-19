
import Link from "next/link";
import { Clock3, ArrowUpRight, Blocks } from "lucide-react";
import type { Build } from "../lib/builds";

export default function BuildCard({ build }: { build: Build }) {
  return (
    <Link
      href={`/builds/${build.slug}`}
      className="build-card-link"
      aria-label={`View ${build.title}, a ${build.difficulty.toLowerCase()} ${build.category.toLowerCase()} build`}
    >
      <article className="build-card">
        <div
          className={`artwork artwork-${build.accent}`}
          aria-hidden="true"
        >
          {build.steps[0]?.image ? (
            <img
              src={build.steps[0].image}
              alt=""
              className="build-card-image"
            />
          ) : (
            <>
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
            </>
          )}

          <div className="artwork-label">
            {build.steps[0]?.image ? "BUILD PREVIEW" : "PREVIEW COMING SOON"}
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
            <Blocks size={14} />
            {build.materials.length} material types
          </div>
        </div>
      </article>
    </Link>
  );
}
