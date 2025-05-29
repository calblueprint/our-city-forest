/* eslint-disable no-unused-vars */
export type ShrubSpecies = {
  name: string;
  scientific_name: string;
  description: string;
  fun_fact: string;
  california_native: boolean;
  dimensions: string;
  stem: ShrubSpeciesStemType;
  dormancy: string;
  flower_color?: string;
  bloom: ShrubSpeciesBloomType;
  growth_rate: ShrubSpeciesGrowthType;
  sun_exposure: ShrubSpeciesSunExposure;
  soil_needs: string;
  water_use: ShrubSpeciesWaterUse;
  total_stock: number;
  available_stock: number;
  image_url?: string;
  is_low_growing: boolean; 
};

export enum ShrubSpeciesStemType {
  MultiStem = 'multi-stem',
  SingleStem = 'single-stem',
}

export enum ShrubSpeciesBloomType {
  Spring = 'spring',
  Summer = 'summer',
  Fall = 'fall',
  Winter = 'winter',
}

export enum ShrubSpeciesSunExposure {
  FullSun = 'full sun',
  PartialShade = 'partial shade',
  Shade = 'shade',
  FullSunPartialShade = 'full_sun_partial_shade',
}

export enum ShrubSpeciesWaterUse {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
}

export enum ShrubSpeciesGrowthType {
  Slow = 'slow',
  Moderate = 'moderate',
  Fast = 'fast',
}

export const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );

export const formatEnumKey = (value?: string | string[]) => {
  if (value === undefined) return '';
  const format = (str: string) => str.replace(/_/g, ' ').toLowerCase();
  if (Array.isArray(value)) {
    const formatted = value
      .filter((item): item is string => typeof item === 'string')
      .map(format);
    if (formatted.length === 0) return '';
    formatted[0] = formatted[0].charAt(0).toUpperCase() + formatted[0].slice(1);
    return formatted.join(', ');
  }
  if (typeof value !== 'string') return '';
  const cleaned = format(value);
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};
