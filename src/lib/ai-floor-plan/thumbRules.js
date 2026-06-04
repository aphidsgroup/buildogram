// src/lib/ai-floor-plan/thumbRules.js

export const ROOM_SIZES = {
  parking: {
    compact: { min: { w: 2500, h: 4500 }, pref: { w: 2500, h: 5000 } },
    standard: { min: { w: 2750, h: 5000 }, pref: { w: 3000, h: 5500 } },
    spacious: { min: { w: 3000, h: 5500 }, pref: { w: 3600, h: 6000 } }
  },
  living: {
    compact: { min: { w: 3000, h: 3600 }, pref: { w: 3300, h: 4200 } },
    standard: { min: { w: 3600, h: 4200 }, pref: { w: 4200, h: 4800 } },
    spacious: { min: { w: 4200, h: 4800 }, pref: { w: 4800, h: 6000 } }
  },
  bedroom: {
    compact: { min: { w: 2750, h: 3000 }, pref: { w: 3000, h: 3300 } },
    standard: { min: { w: 3000, h: 3300 }, pref: { w: 3300, h: 3600 } },
    spacious: { min: { w: 3600, h: 3600 }, pref: { w: 4200, h: 4200 } }
  },
  masterBedroom: {
    compact: { min: { w: 3000, h: 3300 }, pref: { w: 3300, h: 3600 } },
    standard: { min: { w: 3300, h: 3600 }, pref: { w: 3600, h: 4200 } },
    spacious: { min: { w: 4200, h: 4200 }, pref: { w: 4500, h: 4800 } }
  },
  kitchen: {
    compact: { min: { w: 2100, h: 2400 }, pref: { w: 2400, h: 2750 } },
    standard: { min: { w: 2400, h: 3000 }, pref: { w: 3000, h: 3300 } },
    spacious: { min: { w: 3000, h: 3300 }, pref: { w: 3600, h: 3600 } }
  },
  kitchen_cum_dining: {
    compact: { min: { w: 3000, h: 3000 }, pref: { w: 3000, h: 4200 } },
    standard: { min: { w: 3000, h: 4500 }, pref: { w: 3600, h: 4800 } },
    spacious: { min: { w: 4200, h: 4800 }, pref: { w: 4500, h: 6000 } }
  },
  dining: {
    compact: { min: { w: 2750, h: 2750 }, pref: { w: 3000, h: 3000 } },
    standard: { min: { w: 3000, h: 3000 }, pref: { w: 3300, h: 3600 } },
    spacious: { min: { w: 3600, h: 3600 }, pref: { w: 4200, h: 4200 } }
  },
  toilet: { // attached or common
    compact: { min: { w: 1200, h: 1800 }, pref: { w: 1200, h: 2100 } },
    standard: { min: { w: 1500, h: 2100 }, pref: { w: 1500, h: 2400 } },
    spacious: { min: { w: 1800, h: 2400 }, pref: { w: 2100, h: 2750 } }
  },
  pooja: {
    compact: { min: { w: 900, h: 900 }, pref: { w: 1200, h: 1500 } },
    standard: { min: { w: 1500, h: 1500 }, pref: { w: 1800, h: 1800 } },
    spacious: { min: { w: 1800, h: 1800 }, pref: { w: 2100, h: 2100 } }
  },
  staircase: {
    // Clear width per flight typically 900-1000mm. Dog-leg standard is ~2000x4000.
    compact: { min: { w: 1800, h: 3000 }, pref: { w: 1800, h: 3600 } },
    standard: { min: { w: 2000, h: 4000 }, pref: { w: 2100, h: 4200 } },
    spacious: { min: { w: 2400, h: 4500 }, pref: { w: 2400, h: 4800 } }
  },
  utility: {
    compact: { min: { w: 1200, h: 2100 }, pref: { w: 1500, h: 2400 } },
    standard: { min: { w: 1500, h: 3000 }, pref: { w: 1800, h: 3000 } },
    spacious: { min: { w: 1800, h: 3000 }, pref: { w: 2100, h: 3600 } }
  },
  store: {
    compact: { min: { w: 1500, h: 1500 }, pref: { w: 1500, h: 2100 } },
    standard: { min: { w: 1800, h: 2100 }, pref: { w: 2100, h: 2400 } },
    spacious: { min: { w: 2400, h: 2400 }, pref: { w: 2400, h: 3000 } }
  },
  sitout: {
    compact: { min: { w: 1500, h: 1800 }, pref: { w: 1800, h: 2400 } },
    standard: { min: { w: 1800, h: 3000 }, pref: { w: 2100, h: 3600 } },
    spacious: { min: { w: 2400, h: 3600 }, pref: { w: 3000, h: 4500 } }
  },
  balcony: {
    compact: { min: { w: 1200, h: 2400 }, pref: { w: 1500, h: 3000 } },
    standard: { min: { w: 1500, h: 3000 }, pref: { w: 1800, h: 3600 } },
    spacious: { min: { w: 1800, h: 3600 }, pref: { w: 2400, h: 4500 } }
  },
  study: {
    compact: { min: { w: 2400, h: 2400 }, pref: { w: 2750, h: 2750 } },
    standard: { min: { w: 2750, h: 2750 }, pref: { w: 3000, h: 3000 } },
    spacious: { min: { w: 3000, h: 3300 }, pref: { w: 3600, h: 3600 } }
  }
};

export const DOOR_RULES = {
  main: { symbol: 'MD', width: 1050, clearanceFromCorner: 200 },
  bedroom: { symbol: 'D', width: 900, clearanceFromCorner: 150 },
  kitchen: { symbol: 'D', width: 900, clearanceFromCorner: 150 },
  toilet: { symbol: 'D1', width: 750, clearanceFromCorner: 100 },
  store: { symbol: 'D1', width: 750, clearanceFromCorner: 100 },
  balcony: { symbol: 'D', width: 900, clearanceFromCorner: 150 }
};

export const WINDOW_RULES = {
  living: { symbol: 'W', minWidth: 1500, type: 'window' },
  bedroom: { symbol: 'W', minWidth: 1200, type: 'window' },
  kitchen: { symbol: 'W1', minWidth: 900, type: 'window' },
  toilet: { symbol: 'V', minWidth: 600, type: 'ventilator' },
  staircase: { symbol: 'W1', minWidth: 900, type: 'window' }
};

export const VASTU_RULES = {
  North: {
    entry: ['N', 'E', 'NE'],
    kitchen: ['SE', 'NW'],
    masterBedroom: ['SW'],
    pooja: ['NE'],
    toilets: ['W', 'NW', 'S'],
    staircase: ['S', 'W', 'SW']
  },
  East: {
    entry: ['E', 'NE'],
    kitchen: ['SE'],
    masterBedroom: ['SW'],
    pooja: ['NE'],
    toilets: ['W', 'NW', 'S'],
    staircase: ['S', 'W', 'SW']
  },
  South: {
    entry: ['S', 'SE'], // Caution usually applied
    kitchen: ['SE', 'NW'],
    masterBedroom: ['SW'],
    pooja: ['NE'],
    toilets: ['W', 'NW', 'S'],
    staircase: ['S', 'W', 'SW']
  },
  West: {
    entry: ['W', 'NW'],
    kitchen: ['SE', 'NW'],
    masterBedroom: ['SW'],
    pooja: ['NE'],
    toilets: ['W', 'NW', 'S'],
    staircase: ['S', 'W', 'SW']
  }
};
