import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const SvgBackArrow = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <Circle
      cx={16.665}
      cy={17.087}
      r={16.665}
      fill="#446127"
      fillOpacity={0.5}
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M15.442 23.69 9.33 17.087m0 0 6.113-6.603M9.33 17.087H24"
    />
  </Svg>
);
export default SvgBackArrow;
