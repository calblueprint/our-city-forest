import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgX = (props: SvgProps) => (
  <Svg width={28} height={26} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M11.573 13.63 3.448 3.535h6.436l5.016 6.24 5.358-6.212h3.545l-7.19 8.345 8.525 10.606h-6.417l-5.43-6.749-5.8 6.73H3.929zm8.084 7.012L7.394 5.404h1.554l12.247 15.238z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgX;
