import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const Search = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      stroke="#4F4F4F"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m20.878 21.401 4.197 4.06m-1.353-10.827a9.473 9.473 0 1 1-18.947 0 9.473 9.473 0 0 1 18.947 0Z"
    />
  </Svg>
);
