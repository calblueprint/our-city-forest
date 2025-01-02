import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgBack = (props: SvgProps) => (
  <Svg width={18} height={16} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M7.442 14.69 1.33 8.087m0 0 6.113-6.603M1.33 8.087H16"
    />
  </Svg>
);
export default SvgBack;
