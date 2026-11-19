
"use client";

import { useEffect, useState } from "react";
import {
    Check,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Layers3,
} from "lucide-react";
import type { BuildStep } from "../lib/builds";

type SavedProgress = {
    currentIndex: number;
    completedSteps: number[];
    checkedMaterials: string[];
};

export default function BuildGuide({
    buildSlug,
    steps,
}: {
    buildSlug: string;
    steps: BuildStep[];
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [checkedMaterials, setCheckedMaterials] = useState<string[]>([]);
    const [loadedForSlug, setLoadedForSlug] = useState<string | null>(null);
    const [isImageExpanded, setIsImageExpanded] = useState(false);

    const storageKey = `brickfolio:progress:${buildSlug}`;

    // Load saved progress when the build guide opens.
    useEffect(() => {
        try {
            const savedData = localStorage.getItem(storageKey);

            if (savedData) {
                const saved: SavedProgress = JSON.parse(savedData);

                if (typeof saved.currentIndex === "number") {
                    setCurrentIndex(
                        Math.min(
                            Math.max(0, saved.currentIndex),
                            Math.max(0, steps.length - 1)
                        )
                    );
                }

                if (Array.isArray(saved.completedSteps)) {
                    setCompletedSteps(
                        saved.completedSteps.filter((id) =>
                            steps.some((step) => step.id === id)
                        )
                    );
                }

                if (Array.isArray(saved.checkedMaterials)) {
                    setCheckedMaterials(
                        saved.checkedMaterials.filter(
                            (item) => typeof item === "string"
                        )
                    );
                }
            }
        } catch {
            console.warn("Unable to load saved build progress.");
        }

        setLoadedForSlug(buildSlug);
    }, [buildSlug, storageKey, steps]);

    // Save progress whenever something changes.
    useEffect(() => {
        if (loadedForSlug !== buildSlug) return;

        const progress: SavedProgress = {
            currentIndex,
            completedSteps,
            checkedMaterials,
        };

        try {
            localStorage.setItem(storageKey, JSON.stringify(progress));
        } catch {
            console.warn("Unable to save build progress.");
        }
    }, [
        buildSlug,
        storageKey,
        loadedForSlug,
        currentIndex,
        completedSteps,
        checkedMaterials,
    ]);

    if (steps.length === 0) {
        return <p>No construction steps have been added yet.</p>;
    }

    const currentStep = steps[currentIndex];
    const isCompleted = completedSteps.includes(currentStep.id);

    const progress = Math.round(
        (completedSteps.length / steps.length) * 100
    );

    function toggleStepComplete() {
        setCompletedSteps((previous) =>
            previous.includes(currentStep.id)
                ? previous.filter((id) => id !== currentStep.id)
                : [...previous, currentStep.id]
        );
    }

    function toggleMaterial(materialKey: string) {
        setCheckedMaterials((previous) =>
            previous.includes(materialKey)
                ? previous.filter((item) => item !== materialKey)
                : [...previous, materialKey]
        );
    }

    return (
        <section className="interactive-guide">
            <div className="guide-heading">
                <div>
                    <div className="section-kicker">YOUR BUILDING GUIDE</div>
                    <h2>Let's build this.</h2>
                    <p>Follow each stage at your own pace.</p>
                </div>

                <div className="guide-progress-number">
                    {completedSteps.length} / {steps.length}
                    <span>STAGES COMPLETE</span>
                </div>
            </div>

            <div className="guide-progress-track">
                <div
                    className="guide-progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="guide-step-navigation">
                {steps.map((step, index) => (
                    <button
                        key={step.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`guide-step-dot ${currentIndex === index ? "current" : ""
                            } ${completedSteps.includes(step.id) ? "completed" : ""
                            }`}
                        aria-label={`Go to step ${index + 1}: ${step.title}`}
                    >
                        {completedSteps.includes(step.id) ? (
                            <Check size={14} />
                        ) : (
                            index + 1
                        )}
                    </button>
                ))}
            </div>

            <div className="guide-stage">
                <div className="guide-stage-header">
                    <span>STAGE {currentIndex + 1}</span>
                    <span>{steps.length} STAGES TOTAL</span>
                </div>

                <div className="guide-stage-artwork">
                    {currentStep.image ? (
                        <button
                            type="button"
                            className="guide-image-button"
                            onClick={() => setIsImageExpanded(true)}
                            aria-label="Enlarge construction diagram"
                        >
                            <img
                                src={currentStep.image}
                                alt={
                                    currentStep.imageAlt ??
                                    `Construction diagram for ${currentStep.title}`
                                }
                                className="guide-construction-image"
                            />
                            <span className="guide-image-hint">
                                Click to enlarge
                            </span>
                        </button>
                    ) : (
                        <>
                            <div className="guide-placeholder-blocks">
                                <div className="guide-block guide-block-one" />
                                <div className="guide-block guide-block-two" />
                                <div className="guide-block guide-block-three" />
                                <div className="guide-block guide-block-four" />
                            </div>
                            <span>CONSTRUCTION ILLUSTRATIONS</span>
                        </>
                    )}
                </div>

                <div className="guide-instructions">
                    <div className="section-kicker">
                        STEP {currentIndex + 1}
                    </div>

                    <h3>{currentStep.title}</h3>
                    <p>{currentStep.instructions}</p>
                </div>

                <div className="guide-materials">
                    <div className="guide-materials-heading">
                        <Layers3 size={18} />
                        <h4>Materials for this stage</h4>
                    </div>

                    {currentStep.materials.map((material) => {
                        const materialKey =
                            `${currentStep.id}:${material.block}`;

                        const isChecked =
                            checkedMaterials.includes(materialKey);

                        return (
                            <label
                                key={materialKey}
                                className={`guide-material-row ${isChecked ? "material-checked" : ""
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleMaterial(materialKey)}
                                />
                                <span>{material.block}</span>
                                <strong>
                                    {material.quantity.toLocaleString("en-GB")}
                                </strong>
                            </label>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={toggleStepComplete}
                    className={`guide-complete-button ${isCompleted ? "completed" : ""
                        }`}
                >
                    <CheckCircle2 size={18} />
                    {isCompleted
                        ? "Stage completed"
                        : "Mark stage as complete"}
                </button>
            </div>

            <div className="guide-navigation-buttons">
                <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() =>
                        setCurrentIndex((index) => Math.max(0, index - 1))
                    }
                    className="guide-nav-button"
                >
                    <ChevronLeft size={18} />
                    Previous stage
                </button>

                <button
                    type="button"
                    disabled={currentIndex === steps.length - 1}
                    onClick={() =>
                        setCurrentIndex((index) =>
                            Math.min(steps.length - 1, index + 1)
                        )
                    }
                    className="guide-nav-button next"
                >
                    Next stage
                    <ChevronRight size={18} />
                </button>
            </div>

            {progress === 100 && (
                <div className="guide-finished">
                    <CheckCircle2 size={22} />
                    <div>
                        <strong>Build guide completed!</strong>
                        <p>You've completed every construction stage.</p>
                    </div>
                </div>
            )}

            {isImageExpanded && currentStep.image && (
                <div
                    className="guide-image-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Enlarged construction diagram"
                >
                    <button
                        type="button"
                        className="guide-image-close"
                        onClick={() => setIsImageExpanded(false)}
                        aria-label="Close enlarged image"
                    >
                        ✕
                    </button>

                    <img
                        src={currentStep.image}
                        alt={
                            currentStep.imageAlt ??
                            `Construction diagram for ${currentStep.title}`
                        }
                        className="guide-expanded-image"
                    />
                </div>
            )}
        </section>
    );
}
