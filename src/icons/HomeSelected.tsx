import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const HomeSelected = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      fill="#446127"
      d="M15.769.662a1 1 0 0 0-1.3 0l-14.35 12.3v14.46a3 3 0 0 0 3 3h8a1 1 0 0 0 1-1v-6a3 3 0 1 1 6 0v6a1 1 0 0 0 1 1h8a3 3 0 0 0 3-3v-14.46z"
    />
  </Svg>
);
