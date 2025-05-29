import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const FlashCircle = (props: SvgProps) => (
  <Svg width={34} height={34} {...props}>
    <Circle cx={16.665} cy={16.665} r={16.665} fill="#fff" />
    <Path
      stroke="#171717"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M11.09 18.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
    />
  </Svg>
);
