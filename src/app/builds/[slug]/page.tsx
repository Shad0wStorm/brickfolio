
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Blocks,
    Clock3,
    Ruler,
    Layers3,
    Hammer,
    BookOpen,
} from "lucide-react";
import { builds, getBuildBySlug } from "./../../../../lib/builds";
import BuildGuide from "../../../../components/build-guide";

// Allow this dynamic route to resolve URL parameters
// before rendering the page
export const instant = false;

export function generateStaticParams() {
    return builds.map((build) => ({
        slug: build.slug,
    }));
}

export default async function BuildDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const build = getBuildBySlug(slug);

    if (!build) {
        notFound();
    }

    const totalBlocks = build.materials.reduce(
        (total, material) => total + material.quantity,
        0
    );

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

                <Link href="/builds" className="header-button">
                    <ArrowLeft size={15} />
                    Build library
                </Link>
            </header>

            <section className="build-detail">
                <div className="detail-breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/builds">Build library</Link>
                    <span>/</span>
                    <span>{build.title}</span>
                </div>

                <div className="detail-hero">
                    <div className={`detail-artwork artwork-${build.accent}`}>
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
                        <span className="artwork-label">BUILD PREVIEW</span>
                    </div>

                    <div className="detail-intro">
                        <div className="section-kicker">
                            {build.category.toUpperCase()} BUILD
                        </div>
                        <h1>{build.title}</h1>
                        <p>{build.description}</p>

                        <div className="detail-tags">
                            <span>{build.difficulty}</span>
                            <span>{build.size}</span>
                            <span>{build.estimatedTime}</span>
                        </div>

                        <a href="#materials" className="primary-button">
                            View materials <ArrowRight size={16} />
                        </a>
                    </div>
                </div>

                <div className="detail-stats">
                    <div>
                        <Clock3 />
                        <span>Estimated time</span>
                        <strong>{build.estimatedTime}</strong>
                    </div>
                    <div>
                        <Ruler />
                        <span>Build dimensions</span>
                        <strong>
                            {build.dimensions.width} × {build.dimensions.depth} ×{" "}
                            {build.dimensions.height}
                        </strong>
                    </div>
                    <div>
                        <Layers3 />
                        <span>Material types</span>
                        <strong>{build.materials.length}</strong>
                    </div>
                    <div>
                        <Blocks />
                        <span>Estimated blocks</span>
                        <strong>{totalBlocks.toLocaleString("en-GB")}</strong>
                    </div>
                </div>

                <div className="detail-content-grid">
                    <section className="materials-panel" id="materials">
                        <div className="section-kicker">WHAT YOU WILL NEED</div>
                        <h2>Material checklist</h2>
                        <p>Gather your materials before starting the build.</p>

                        {build.materials.map((material) => (
                            <div className="material-row" key={material.block}>
                                <div className="material-placeholder">
                                    <Blocks size={18} />
                                </div>
                                <span>{material.block}</span>
                                <strong>{material.quantity.toLocaleString("en-GB")}</strong>
                            </div>
                        ))}
                    </section>

                    <section className="steps-panel">
                        <div className="section-kicker">YOUR BUILD JOURNEY</div>
                        <h2>Construction overview</h2>
                        <p>Here's how the build is broken down.</p>

                        {build.steps.map((step) => (
                            <article className="overview-step" key={step.id}>
                                <div className="step-number">{step.id}</div>
                                <div>
                                    <h3>{step.title}</h3>
                                    <p>{step.instructions}</p>
                                    <span>{step.materials.length} material types</span>
                                </div>
                            </article>
                        ))}

                        <div className="guide-placeholder">
                            <BookOpen size={24} />
                            <h3>Step-by-step guide coming next</h3>
                            <p>
                                We'll turn these construction stages into an interactive
                                guide with illustrations, material tracking and progress.
                            </p>
                        </div>
                    </section>
                </div>

                <BuildGuide 
                    buildSlug={build.slug}
                    steps={build.steps} 
                />

                <div className="detail-bottom-link">
                    <Hammer size={19} />
                    Ready to start building?
                    <span>Interactive instructions are our next development milestone.</span>
                </div>
            </section>
        </main>
    );
}
