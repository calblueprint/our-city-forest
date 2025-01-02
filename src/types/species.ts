/* eslint-disable no-unused-vars */
export type Species = {
  name: string;
  scientific_name: string;
  image_link: string;
  description: string;
  fun_fact: string;
  height_ft?: number;
  ca_native?: boolean;
  fall_color?: boolean;
  utility_friendly?: boolean;
  root_damage_potential?: TreeRootDamagePotential;
  tree_shape?: TreeShape;
  flower_color?: string;
  fruit_type?: TreeFruitType;
  water_amount?: TreeWaterAmount;
  evergreen?: boolean;
  powerline_friendly?: boolean;
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

export enum TreeFruitType {
  Wet = 'wet',
  Dry = 'dry',
}

export enum TreeRootDamagePotential {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
}

export enum TreeWaterAmount {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
}
