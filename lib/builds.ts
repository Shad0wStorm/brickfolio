
export interface BuildMaterial {
  block: string;
  quantity: number;
}

export interface BuildStep {
  id: number;
  title: string;
  instructions: string;
  materials: BuildMaterial[];
  image?: string;
  imageAlt?: string;
}

export interface Build {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedTime: string;
  size: "Small" | "Medium" | "Large";
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  materials: BuildMaterial[];
  steps: BuildStep[];
  accent: string;
}

export const builds: Build[] = [
  {
    id: "build-001",
    slug: "frosthold-keep",
    title: "Frosthold Keep",
    description:
      "A formidable medieval fortress overlooking a frozen wilderness. Perfect for an ambitious survival base or a fantasy kingdom.",
    category: "Medieval",
    difficulty: "Intermediate",
    estimatedTime: "3–5 hours",
    size: "Large",
    dimensions: {
      width: 35,
      height: 28,
      depth: 30,
    },
    materials: [
      { block: "Stone Bricks", quantity: 420 },
      { block: "Deepslate Bricks", quantity: 180 },
      { block: "Spruce Planks", quantity: 120 },
      { block: "Stone Brick Stairs", quantity: 96 },
      { block: "Glass Panes", quantity: 32 },
      { block: "Spruce Logs", quantity: 48 },
    ],
    steps: [
      {
        id: 1,
        title: "Prepare the foundations",
        instructions:
          "Mark out a 35 by 30 block building area. Lay the outer foundation using stone bricks and leave the central entrance clear.",
        image: "/images/frosthold-keep/stage-1.png",
        imageAlt: "Isometric diagram showing the stone brick foundation layout.",
        materials: [
          { block: "Stone Bricks", quantity: 80 },
        ],
      },
      {
        id: 2,
        title: "Build the outer walls",
        instructions:
          "Raise the perimeter walls, leaving gaps for the entrance and windows. Add corner supports using darker stone.",
        image: "/images/frosthold-keep/stage-2.png",
        imageAlt: "Isometric diagram showing the outer walls construction.",
        materials: [
          { block: "Stone Bricks", quantity: 140 },
          { block: "Deepslate Bricks", quantity: 40 },
        ],
      },
      {
        id: 3,
        title: "Construct the towers",
        instructions:
          "Build four defensive towers at the corners. Give each tower a slightly different roof height for visual interest.",
        image: "/images/frosthold-keep/stage-3.png",
        imageAlt: "Isometric diagram showing the defensive towers construction.",
        materials: [
          { block: "Stone Bricks", quantity: 100 },
          { block: "Spruce Planks", quantity: 40 },
        ],
      },
    ],
    accent: "ice",
  },
  {
    id: "build-002",
    slug: "woodland-retreat",
    title: "Woodland Retreat",
    description:
      "A cosy woodland starter home combining natural materials, a compact layout and a welcoming atmosphere.",
    category: "Starter",
    difficulty: "Beginner",
    estimatedTime: "45–60 mins",
    size: "Small",
    dimensions: {
      width: 11,
      height: 9,
      depth: 13,
    },
    materials: [
      { block: "Oak Planks", quantity: 96 },
      { block: "Spruce Logs", quantity: 48 },
      { block: "Cobblestone", quantity: 64 },
      { block: "Glass Panes", quantity: 16 },
    ],
    steps: [
      {
        id: 1,
        title: "Lay the foundations",
        instructions:
          "Mark out an 11 by 13 block rectangle and build a simple cobblestone foundation.",
        materials: [
          { block: "Cobblestone", quantity: 40 },
        ],
      },
      {
        id: 2,
        title: "Build the walls",
        instructions:
          "Use oak planks for the walls and spruce logs for the corners. Leave space for windows and a doorway.",
        materials: [
          { block: "Oak Planks", quantity: 64 },
          { block: "Spruce Logs", quantity: 16 },
        ],
      },
    ],
    accent: "forest",
  },
  {
    id: "build-003",
    slug: "cliffside-farm",
    title: "Cliffside Farm",
    description:
      "A practical farming complex built into a mountainside, with crop terraces and storage space.",
    category: "Survival",
    difficulty: "Intermediate",
    estimatedTime: "1–2 hours",
    size: "Medium",
    dimensions: {
      width: 22,
      height: 14,
      depth: 18,
    },
    materials: [
      { block: "Oak Planks", quantity: 100 },
      { block: "Stone", quantity: 120 },
      { block: "Glass", quantity: 24 },
      { block: "Dirt", quantity: 80 },
    ],
    steps: [
      {
        id: 1,
        title: "Prepare the hillside",
        instructions:
          "Clear a suitable section of hillside and level the ground for the farm terraces.",
        materials: [
          { block: "Stone", quantity: 40 },
          { block: "Dirt", quantity: 40 },
        ],
      },
      {
        id: 2,
        title: "Build the terraces",
        instructions:
          "Create stepped farming platforms and connect them with a staircase.",
        materials: [
          { block: "Stone", quantity: 80 },
          { block: "Oak Planks", quantity: 40 },
        ],
      },
    ],
    accent: "farm",
  },
  {
    id: "build-004",
    slug: "emberwatch-tower",
    title: "Emberwatch Tower",
    description:
      "A dramatic fantasy watchtower featuring dark stonework, timber details and elevated viewing platforms.",
    category: "Fantasy",
    difficulty: "Advanced",
    estimatedTime: "2–4 hours",
    size: "Medium",
    dimensions: {
      width: 17,
      height: 32,
      depth: 17,
    },
    materials: [
      { block: "Deepslate Bricks", quantity: 160 },
      { block: "Stone Bricks", quantity: 100 },
      { block: "Spruce Planks", quantity: 70 },
      { block: "Lanterns", quantity: 12 },
    ],
    steps: [
      {
        id: 1,
        title: "Build the tower base",
        instructions:
          "Create a square foundation using deepslate bricks, with reinforced corners.",
        materials: [
          { block: "Deepslate Bricks", quantity: 60 },
        ],
      },
      {
        id: 2,
        title: "Raise the tower",
        instructions:
          "Build the main tower upwards, incorporating narrow windows and timber supports.",
        materials: [
          { block: "Deepslate Bricks", quantity: 100 },
          { block: "Spruce Planks", quantity: 40 },
        ],
      },
    ],
    accent: "ember",
  },
];

export function getBuildBySlug(slug: string) {
  return builds.find((build) => build.slug === slug);
}
