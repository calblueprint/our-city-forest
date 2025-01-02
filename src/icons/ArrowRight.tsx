import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgArrowRight = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      stroke="#446127"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m6.964 14.586 4.458-4.618a1.443 1.443 0 0 0 0-1.984L6.964 3.366"
    />
  </Svg>
);
export default SvgArrowRight;
