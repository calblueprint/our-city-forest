import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronRight = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#4F4F4F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 7L15 12L10 17"
    />
  </Svg>
);
