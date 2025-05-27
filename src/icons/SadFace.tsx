import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

export const SadFace = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G
      stroke="#828282"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" />
      <Path
        strokeMiterlimit={10}
        d="M7 8.75c1-1 2.63-1 3.64 0M13.36 8.75c1-1 2.63-1 3.64 0M8.4 17.7h7.2c.5 0 .9-.4.9-.9 0-2.49-2.01-4.5-4.5-4.5s-4.5 2.01-4.5 4.5c0 .5.4.9.9.9Z"
      />
    </G>
  </Svg>
);
