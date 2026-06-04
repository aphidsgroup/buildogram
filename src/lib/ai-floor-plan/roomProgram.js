// src/lib/ai-floor-plan/roomProgram.js
import { ROOM_SIZES, VASTU_RULES } from './thumbRules';

export function createRoomProgram(formData) {
  const req = formData.roomRequirements;
  const pref = formData.roomSizePreference || 'standard';
  const facing = formData.facing || 'North';
  const vastu = formData.vastuPreference || 'Moderate'; // Strict, Moderate, Ignore
  
  const getZone = (roomType, defaultZones) => {
    if (vastu === 'Ignore') return [];
    return VASTU_RULES[facing]?.[roomType] || defaultZones || [];
  };

  const program = [];
  let idCounter = 1;

  const addRoom = (id, name, type, sizeKey, priority, requiresExternalWall, preferredZones, adjacency = []) => {
    const sizeData = ROOM_SIZES[sizeKey] ? ROOM_SIZES[sizeKey][pref] : { min: {w: 2000, h: 2000}, pref: {w: 3000, h: 3000} };
    program.push({
      id: id || `${type}_${idCounter++}`,
      name: name,
      type: type,
      minSize: { width: sizeData.min.w, height: sizeData.min.h },
      preferredSize: { width: sizeData.pref.w, height: sizeData.pref.h },
      requiresExternalWall,
      preferredZone: preferredZones, // array of allowed zones
      adjacency,
      priority
    });
  };

  // 1. Parking / Portico
  if (req.parking?.enabled) {
    for (let i = 0; i < (req.parking.count || 1); i++) {
      addRoom(`portico_${i+1}`, i === 0 ? 'PORTICO' : 'PARKING', 'parking', 'parking', 100, true, ['FRONT'], []);
    }
  }

  // 2. Front Hall / Living
  if (req.living?.enabled) {
    addRoom('hall', 'FRONT HALL', 'living', 'living', 95, true, getZone('entry', ['FRONT']), []);
  }

  // 3. Sit Out
  if (req.sitout?.enabled) {
    addRoom('sitout', 'SIT OUT', 'sitout', 'sitout', 80, true, ['FRONT'], ['hall']);
  }

  // 4. Kitchen & Dining
  if (req.kitchen?.enabled) {
    if (req.kitchen.type === 'kitchen_cum_dining') {
      addRoom('kitchen', 'KITCHEN CUM DINING', 'kitchen', 'kitchen_cum_dining', 90, true, getZone('kitchen', ['SE', 'NW']), ['hall']);
    } else {
      addRoom('kitchen', 'KITCHEN', 'kitchen', 'kitchen', 90, true, getZone('kitchen', ['SE', 'NW']), ['dining', 'hall']);
      if (req.dining?.enabled) {
        addRoom('dining', 'DINING', 'dining', 'dining', 85, false, [], ['kitchen', 'hall']);
      }
    }
  }

  // 5. Utility
  if (req.utility?.enabled) {
    addRoom('utility', 'UTILITY', 'utility', 'utility', 70, true, ['REAR'], ['kitchen']);
  }

  // 6. Pooja
  if (req.pooja?.enabled) {
    addRoom('pooja', 'POOJA', 'pooja', 'pooja', 85, false, getZone('pooja', ['NE']), ['hall', 'dining']);
  }

  // 7. Master Bedroom
  if (req.masterBedroom?.enabled) {
    addRoom('master_bed', 'MASTER BED ROOM', 'bedroom', 'masterBedroom', 90, true, getZone('masterBedroom', ['SW']), []);
    if (req.masterBedroom.attachedToilet) {
      addRoom('master_toilet', 'ATTACHED TOILET', 'toilet', 'toilet', 90, true, getZone('toilets', ['W', 'S']), ['master_bed']);
    }
  }

  // 8. Extra Bedrooms
  for (let i = 0; i < (req.bedrooms?.count || 0); i++) {
    const bId = `bed_${i+1}`;
    addRoom(bId, 'BED ROOM', 'bedroom', 'bedroom', 80, true, [], ['hall']);
  }

  // 9. Common Toilets
  for (let i = 0; i < (req.commonToilets?.count || 0); i++) {
    addRoom(`common_toilet_${i+1}`, 'COMMON TOILET', 'toilet', 'toilet', 85, true, getZone('toilets', ['W', 'NW', 'S']), ['hall']);
  }

  // 10. Staircase
  if (req.staircase?.enabled) {
    addRoom('staircase', 'STAIRCASE', 'staircase', 'staircase', 85, true, getZone('staircase', ['S', 'W', 'SW']), ['hall', 'portico']);
  }

  // 11. Store
  if (req.store?.enabled) {
    addRoom('store', 'STORE', 'store', 'store', 60, false, [], ['kitchen', 'dining']);
  }

  // 12. Study
  if (req.study?.enabled) {
    addRoom('study', 'STUDY', 'study', 'study', 65, true, [], ['hall', 'master_bed']);
  }

  return program;
}
