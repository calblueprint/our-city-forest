import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const BackArrow = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Circle cx={16.665} cy={17} r={16.665} fill="#fff" />
    <Path
      stroke="#1D1D1D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.442 23.603 9.33 17m0 0 6.113-6.603M9.33 17H24"
    />
  </Svg>
);
