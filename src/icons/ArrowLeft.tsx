import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ArrowLeft = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#4F4F4F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.6662 19L3.99951 12M3.99951 12L10.6662 5M3.99951 12L19.9995 12"
    />
  </Svg>
);
