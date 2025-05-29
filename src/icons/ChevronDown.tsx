import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronDown = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#828282"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 10L12.0008 14.58L17 10"
    />
  </Svg>
);
