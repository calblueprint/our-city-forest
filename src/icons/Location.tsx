import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SvgLocationPin = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <G fill="#446127">
      <Path
        d="M22.957 9.656C21.82 4.65 17.454 2.397 13.62 2.397h-.011c-3.824 0-8.2 2.243-9.338 7.248-1.268 5.59 2.156 10.324 5.254 13.303a5.9 5.9 0 0 0 4.095 1.657 5.84 5.84 0 0 0 4.084-1.657c3.098-2.98 6.522-7.703 5.254-13.292"
        opacity={0.4}
      />
      <Path
        stroke="#446127"
        strokeWidth={1.5}
        d="M16.281 11.67a2.663 2.663 0 1 1-5.325 0 2.663 2.663 0 0 1 5.325 0Z"
      />
    </G>
  </Svg>
);
export default SvgLocationPin;
