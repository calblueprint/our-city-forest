import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgSort = (props: SvgProps) => (
  <Svg width={23} height={22} fill="none" {...props}>
    <Path
      stroke="#171717"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M3.325 6.436h16.5M6.075 10.811h11M9.742 15.186h3.667"
    />
  </Svg>
);
export default SvgSort;
