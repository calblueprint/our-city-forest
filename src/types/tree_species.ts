/* eslint-disable no-unused-vars */
export type TreeSpecies = {
  name: string;
  scientific_name: string;
  description: string;
  fun_fact: string;
  california_native: boolean;
  tree_shape: TreeShape;
  foliage_type: TreeFoliageType;
  max_height_ft: number;
  leaf_color?: string;
  flower_color?: string;
  has_fall_color: boolean;
  litter_type?: TreeLitterType;
  water_use: TreeWaterUse;
  root_damage_potential: TreeRootDamagePotential;
  utility_friendly: boolean;
  image_url?: string;
};

export enum TreeShape {
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

export enum TreeFoliageType {
  Deciduous = 'deciduous',
  Evergreen = 'evergreen',
}

export enum TreeLitterType {
  Dry = 'dry',
  Wet = 'wet',
}

export enum TreeWaterUse {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
}

export enum TreeRootDamagePotential {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
}
