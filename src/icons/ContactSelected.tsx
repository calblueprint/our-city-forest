import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgContactSelected = (props: SvgProps) => (
  <Svg width={30} height={31} fill="none" {...props}>
    <Path
      fill="#446127"
      d="M15 15.422a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5M15 18.547c-6.262 0-11.362 4.2-11.362 9.375 0 .35.275.625.625.625h21.475c.35 0 .625-.275.625-.625 0-5.175-5.1-9.375-11.363-9.375"
    />
  </Svg>
);
export default SvgContactSelected;
