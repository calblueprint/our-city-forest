import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

export const Fruit = (props: SvgProps) => (
  <Svg width={28} height={32} fill="none" {...props}>
    <G strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
      <Path
        fill="#9BA98C"
        stroke="#9BA98C"
        d="M12.152 29.09c5.607 0 10.152-4.564 10.152-10.195 0-5.63-4.545-10.196-10.152-10.196S2 13.264 2 18.895s4.545 10.196 10.152 10.196"
      />
      <G fill="#A1AD96" stroke="#446127">
        <Path d="M23.059 9.235c-1.736 1.927-6.035 2.026-6.035 2.026s-.335-4.306 1.4-6.234C20.16 3.1 24.46 3 24.46 3s.334 4.307-1.401 6.235" />
        <Path d="M21.768 9.414c-2.053-.242-4.686 1.97-4.686 1.97s2.054 2.765 4.106 3.006c2.053.242 4.686-1.97 4.686-1.97s-2.054-2.764-4.106-3.006" />
      </G>
    </G>
  </Svg>
);
