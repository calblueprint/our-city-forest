import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronUp = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#828282"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 14.58L12.0008 10L17 14.58"
    />
  </Svg>
);
