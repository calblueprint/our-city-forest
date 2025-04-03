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
  soil_needs: ShrubSpeciesSoilNeeds;
  water_use: ShrubSpeciesWaterUse;
  total_stock: number;
  available_stock: number;
  image_url?: string;
};


export enum ShrubSpeciesStemType {
  MultiStem = "multi-stem",
  SingleStem = "single-stem",
}

export enum ShrubSpeciesBloomType {
  Spring = "spring",
  Summer = "summer",
  Fall = "fall",
  Winter = "winter",
}

export enum ShrubSpeciesSunExposure {
  FullSun = "full sun",
  PartialShade = "partial shade",
  Shade = "shade",
}

export enum ShrubSpeciesSoilNeeds {
  WellDraining = "well-draining",
  Clay = "clay",
  CoarseGrained = "coarse-grained",
}


export enum ShrubSpeciesWaterUse {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
}

export enum ShrubSpeciesGrowthType {
  Slow = 'slow',
  Moderate = 'moderate',
  Fast = 'fast'
}

export const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );

export const formatEnumKey = (s?: string) => {
  if (typeof s !== 'string') return '';
  return s.replace(/_/g, ' ').toLowerCase();
};