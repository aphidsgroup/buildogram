export const CAD_BLOCKS = [
  // BEDROOM
  {
    id: "single-bed",
    name: "Single Bed",
    category: "bedroom",
    view: "interior",
    widthMm: 914,
    heightMm: 1981,
    allowedRooms: ["BED ROOM", "MASTER BED ROOM"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 914, h: 1981 },
      { type: "line", x1: 0, y1: 457, x2: 914, y2: 457 },
      { type: "rect", x: 152, y: 61, w: 610, h: 305 } // pillow
    ]
  },
  {
    id: "double-bed",
    name: "Double Bed",
    category: "bedroom",
    view: "interior",
    widthMm: 1829,
    heightMm: 1981,
    allowedRooms: ["BED ROOM", "MASTER BED ROOM"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 1829, h: 1981 },
      { type: "line", x1: 0, y1: 457, x2: 1829, y2: 457 },
      { type: "rect", x: 152, y: 61, w: 610, h: 305 }, // pillow 1
      { type: "rect", x: 1067, y: 61, w: 610, h: 305 }  // pillow 2
    ]
  },
  {
    id: "wardrobe",
    name: "Wardrobe",
    category: "bedroom",
    view: "interior",
    widthMm: 1219,
    heightMm: 610,
    allowedRooms: ["BED ROOM", "MASTER BED ROOM", "WARDROBE", "DRESS"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 1219, h: 610 },
      { type: "line", x1: 0, y1: 0, x2: 1219, y2: 610 },
      { type: "line", x1: 1219, y1: 0, x2: 0, y2: 610 }
    ]
  },

  // LIVING
  {
    id: "sofa-3",
    name: "3-Seater Sofa",
    category: "living",
    view: "interior",
    widthMm: 1829,
    heightMm: 762,
    allowedRooms: ["FRONT HALL", "LIVING ROOM", "LIVING", "HALL", "LOUNGE"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 1829, h: 762, radius: 61 },
      { type: "rect", x: 152, y: 152, w: 1524, h: 549, radius: 61 }, // seat
      { type: "line", x1: 640, y1: 152, x2: 640, y2: 701 },
      { type: "line", x1: 1189, y1: 152, x2: 1189, y2: 701 }
    ]
  },
  {
    id: "tv-unit",
    name: "TV Unit",
    category: "living",
    view: "interior",
    widthMm: 1219,
    heightMm: 366,
    allowedRooms: ["FRONT HALL", "LIVING ROOM", "LIVING", "HALL", "LOUNGE", "MASTER BED ROOM"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 1219, h: 366 },
      { type: "rect", x: 152, y: 61, w: 914, h: 122 } // tv screen line
    ]
  },

  // DINING
  {
    id: "dining-6",
    name: "6-Seater Dining",
    category: "dining",
    view: "interior",
    widthMm: 1829,
    heightMm: 1219,
    allowedRooms: ["KITCHEN CUM DINING", "DINING", "FRONT HALL"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 305, y: 305, w: 1219, h: 610 }, // table
      { type: "rect", x: 457, y: 61, w: 305, h: 183 }, // top chairs
      { type: "rect", x: 1067, y: 61, w: 305, h: 183 },
      { type: "rect", x: 457, y: 975, w: 305, h: 183 }, // bottom chairs
      { type: "rect", x: 1067, y: 975, w: 305, h: 183 },
      { type: "rect", x: 61, y: 457, w: 183, h: 305 }, // left chair
      { type: "rect", x: 1585, y: 457, w: 183, h: 305 }  // right chair
    ]
  },

  // KITCHEN
  {
    id: "kitchen-sink",
    name: "Kitchen Sink",
    category: "kitchen",
    view: "interior",
    widthMm: 762,
    heightMm: 549,
    allowedRooms: ["KITCHEN", "KITCHEN CUM DINING", "UTILITY"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 762, h: 549 },
      { type: "rect", x: 61, y: 61, w: 305, h: 427, radius: 30 },
      { type: "rect", x: 396, y: 61, w: 305, h: 427, radius: 30 },
      { type: "circle", x: 213, y: 274, r: 46 },
      { type: "circle", x: 549, y: 274, r: 46 }
    ]
  },
  {
    id: "kitchen-hob",
    name: "Hob (Stove)",
    category: "kitchen",
    view: "interior",
    widthMm: 762,
    heightMm: 549,
    allowedRooms: ["KITCHEN", "KITCHEN CUM DINING"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 762, h: 549 },
      { type: "circle", x: 213, y: 274, r: 122 },
      { type: "circle", x: 549, y: 274, r: 122 }
    ]
  },

  // TOILET
  {
    id: "wc-indian",
    name: "Indian WC",
    category: "toilet",
    view: "interior",
    widthMm: 457,
    heightMm: 610,
    allowedRooms: ["TOILET", "COMMON TOILET", "ATTACHED TOILET"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 457, h: 610 },
      { type: "line", x1: 91, y1: 152, x2: 91, y2: 457 },
      { type: "line", x1: 366, y1: 152, x2: 366, y2: 457 },
      { type: "circle", x: 229, y: 305, r: 61 }
    ]
  },
  {
    id: "wc-western",
    name: "Western WC",
    category: "toilet",
    view: "interior",
    widthMm: 457,
    heightMm: 671,
    allowedRooms: ["TOILET", "COMMON TOILET", "ATTACHED TOILET"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 30, y: 0, w: 396, h: 183 }, // tank
      { type: "circle", x: 229, y: 396, r: 152 } // bowl
    ]
  },
  {
    id: "wash-basin",
    name: "Wash Basin",
    category: "toilet",
    view: "interior",
    widthMm: 457,
    heightMm: 366,
    allowedRooms: ["TOILET", "COMMON TOILET", "ATTACHED TOILET", "DINING"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 457, h: 366 },
      { type: "circle", x: 229, y: 183, r: 122 }
    ]
  },
  {
    id: "shower-tray",
    name: "Shower",
    category: "toilet",
    view: "interior",
    widthMm: 914,
    heightMm: 914,
    allowedRooms: ["TOILET", "COMMON TOILET", "ATTACHED TOILET"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 914, h: 914 },
      { type: "line", x1: 0, y1: 0, x2: 914, y2: 914 },
      { type: "line", x1: 914, y1: 0, x2: 0, y2: 914 },
      { type: "circle", x: 457, y: 457, r: 61 }
    ]
  },

  // POOJA
  {
    id: "pooja-unit",
    name: "Pooja Unit",
    category: "pooja",
    view: "interior",
    widthMm: 914,
    heightMm: 457,
    allowedRooms: ["POOJA", "FRONT HALL"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 914, h: 457 },
      { type: "line", x1: 152, y1: 152, x2: 762, y2: 152 },
      { type: "line", x1: 152, y1: 305, x2: 762, y2: 305 }
    ]
  },

  // PARKING
  {
    id: "car",
    name: "Car",
    category: "portico",
    view: "interior",
    widthMm: 1676,
    heightMm: 4267,
    allowedRooms: ["PORTICO", "PARKING", "GARAGE"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 1676, h: 4267, radius: 305 },
      { type: "rect", x: 152, y: 914, w: 1372, h: 2438, radius: 152 }, // cabin
      { type: "line", x1: 152, y1: 1524, x2: 1524, y2: 1524 }, // windshield
      { type: "line", x1: 152, y1: 2743, x2: 1524, y2: 2743 }  // rear window
    ]
  },
  
  // ELECTRICAL / SERVICES
  {
    id: "db-box",
    name: "Distribution Board",
    category: "electrical",
    view: "services",
    widthMm: 457,
    heightMm: 152,
    allowedRooms: ["FRONT HALL", "PORTICO"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "rect", x: 0, y: 0, w: 457, h: 152 },
      { type: "text", x: 61, y: 30, text: "DB", fontSize: 91 }
    ]
  },
  {
    id: "oht",
    name: "Overhead Tank",
    category: "plumbing",
    view: "services",
    widthMm: 1219,
    heightMm: 1219,
    allowedRooms: ["OHT", "TERRACE", "OPEN TERRACE"],
    resizable: true,
    keepAspectRatio: true,
    minWidthMm: 600,
    maxWidthMm: 3000,
    minHeightMm: 600,
    maxHeightMm: 3000,
    requiredClearanceMm: { front: 500, side: 300 },
    anchorRules: ["against_solid_wall"],
    render: [
      { type: "circle", x: 610, y: 610, r: 610 },
      { type: "text", x: 366, y: 549, text: "OHT", fontSize: 244 }
    ]
  }
];

export function getBlockDefinition(blockId) {
  return CAD_BLOCKS.find(b => b.id === blockId);
}
