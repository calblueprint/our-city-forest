import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const Lightbulb = (props: SvgProps) => (
  <Svg width={27} height={27} fill="none" {...props}>
    <Path
      stroke="#446127"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.019 23.902h5.2m-4.55-13h3.9m-8.45-1.3a6.5 6.5 0 1 1 13 0c0 2.665-1.604 4.846-3.9 5.85v3.9a1.3 1.3 0 0 1-1.3 1.3h-2.6a1.3 1.3 0 0 1-1.3-1.3V15.56a6.5 6.5 0 0 1-3.9-5.96"
    />
  </Svg>
);
