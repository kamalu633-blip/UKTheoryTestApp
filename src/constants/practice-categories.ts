export const CATEGORY_KEYS = [
  'roadSigns',
  'rulesOfTheRoad',
  'hazardPerception',
  'motorwayRules',
  'vehicleSafety',
  'documentsLegal',
  'incidentsFirstAid',
  'environment',
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export const CATEGORY_COUNTS: Record<CategoryKey, number> = {
  roadSigns: 126,
  rulesOfTheRoad: 98,
  hazardPerception: 75,
  motorwayRules: 42,
  vehicleSafety: 64,
  documentsLegal: 38,
  incidentsFirstAid: 29,
  environment: 24,
};

export function isCategoryKey(value: string): value is CategoryKey {
  return (CATEGORY_KEYS as readonly string[]).includes(value);
}
