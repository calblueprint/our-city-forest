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
  is_low_growing: boolean; // ADDED FOR THE SPRINT, THIS MAY NEED TO BE REMOVED
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
  FullSunPartianShade = 'full_sun_partian_shade',
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

  // handle array
  if (Array.isArray(value)) {
    return value.map(item => {
      if (typeof item !== 'string') return '';
      return item.replace(/_/g, ' ').toLowerCase();
    });
  }
  if (typeof value !== 'string') return '';
  return value.replace(/_/g, ' ').toLowerCase();
};
