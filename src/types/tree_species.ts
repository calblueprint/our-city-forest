/* eslint-disable no-unused-vars */
export type TreeSpecies = {
  name: string;
  scientific_name: string;
  description: string;
  fun_fact: string;
  california_native: boolean;
  tree_shape: TreeSpeciesShape;
  foliage_type: TreeSpeciesFoliageType;
  max_height_ft: number;
  leaf_color?: string;
  flower_color?: string;
  has_fall_color: boolean;
  litter_type?: TreeSpeciesLitterType;
  water_use: TreeSpeciesWaterUse;
  root_damage_potential: TreeSpeciesRootDamagePotential;
  utility_friendly: boolean;
  image_url?: string;
};

export enum TreeSpeciesShape {
  Columnar = 'columnar',
  Conical = 'conical',
  Irregular = 'irregular',
  Palm = 'palm',
  Rounded = 'rounded',
  Prostrate = 'prostrate',
  Pyramid = 'pyramid',
  Sprawling = 'sprawling',
  SwordPalm = 'sword_palm',
  Weeping = 'weeping',
  Vase = 'vase',
}

export enum TreeSpeciesFoliageType {
  Deciduous = 'deciduous',
  Evergreen = 'evergreen',
}

export enum TreeSpeciesLitterType {
  Dry = 'dry',
  Wet = 'wet',
}

export enum TreeSpeciesWaterUse {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
}

export enum TreeSpeciesRootDamagePotential {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
}
