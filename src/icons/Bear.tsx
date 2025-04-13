import * as React from 'react';
import Svg, { G, Mask, Path, SvgProps } from 'react-native-svg';

export const Bear = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Mask
      id="mask0"
      maskUnits="userSpaceOnUse"
      x={1}
      y={1}
      width={22}
      height={22}
    >
      <Path
        d="M2.5 6.53C2.5 7.77 3.146 8.7605 4 9.5C3.462 10.573 3 11.737 3 13C3 17.6105 7.062 21.5 12 21.5C16.938 21.5 21 17.6105 21 13C21 11.737 20.538 10.573 20 9.5C20.854 8.7605 21.5 7.7395 21.5 6.5C21.5 4.274 19.66 2.5 17.5 2.5C15.8635 2.5 14.5835 3.53 14 5C13.3416 4.86734 12.6716 4.80134 12 4.803C11.3245 4.803 10.6325 4.8675 10 5C9.4165 3.53 8.1365 2.5 6.5 2.5C4.34 2.5 2.5 4.3045 2.5 6.53Z"
        fill="#555555"
        stroke="white"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M10 10.5C10.5523 10.5 11 10.0523 11 9.5C11 8.94772 10.5523 8.5 10 8.5C9.44772 8.5 9 8.94772 9 9.5C9 10.0523 9.44772 10.5 10 10.5Z"
        fill="white"
      />
      <Path
        d="M14 10.5C14.5523 10.5 15 10.0523 15 9.5C15 8.94772 14.5523 8.5 14 8.5C13.4477 8.5 13 8.94772 13 9.5C13 10.0523 13.4477 10.5 14 10.5Z"
        fill="white"
      />
      <Path
        d="M12 14.5C12.8284 14.5 13.5 13.8284 13.5 13C13.5 12.1716 12.8284 11.5 12 11.5C11.1716 11.5 10.5 12.1716 10.5 13C10.5 13.8284 11.1716 14.5 12 14.5Z"
        fill="white"
      />
      <Path
        d="M12 13V17"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 16.5C12.862 17.638 11.138 17.638 10 16.5"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path d="M0 0H24V24H0V0Z" fill="#446127" />
    </G>
  </Svg>
);
