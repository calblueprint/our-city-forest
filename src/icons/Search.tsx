import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgSearch = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke="#4F4F4F"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m20.878 21.401 4.197 4.06m-1.353-10.827a9.473 9.473 0 1 1-18.947 0 9.473 9.473 0 0 1 18.947 0Z"
    />
  </Svg>
);
export default SvgSearch;
