import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const WateringCan = (props: SvgProps) => (
  <Svg width={30} height={26} fill="none" {...props}>
    <Path
      fill="#9BA98C"
      d="M23.48 5.89a3.46 3.46 0 0 0-.802 3.723l-4.032 4.056v-2.875c0-.764-.622-1.39-1.381-1.39h-1.423c.042-.235.042-.458.042-.694 0-4.222-3.397-7.639-7.595-7.639A7.56 7.56 0 0 0 3.918 2.46a7.63 7.63 0 0 0-2.78 3.665 7.68 7.68 0 0 0-.176 4.607 7.64 7.64 0 0 0 2.493 3.868v8.695c0 .764.622 1.389 1.381 1.389h12.429c.76 0 1.38-.625 1.38-1.39v-5.708l5.98-6.014c1.243.486 2.693.236 3.688-.777zM3.523 9.406c-.027-.236-.069-.459-.069-.695 0-2.68 2.168-4.86 4.834-4.86s4.833 2.18 4.833 4.86c0 .236-.041.459-.07.695z"
    />
  </Svg>
);
