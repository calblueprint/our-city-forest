import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

export const FlashCircle = (props: SvgProps) => (
  <Svg width={41} height={40} fill="none" {...props}>
    <G fill="#fff">
      <Path
        d="M20.331 36.667c9.205 0 16.667-7.462 16.667-16.667S29.536 3.333 20.33 3.333C11.127 3.333 3.665 10.795 3.665 20s7.462 16.667 16.666 16.667"
        opacity={0.5}
      />
      <Path d="M25.798 18.833h-2.833v-6.6c0-1.533-.834-1.85-1.85-.7l-.734.834-6.2 7.05c-.85.966-.5 1.75.784 1.75h2.833v6.6c0 1.533.833 1.85 1.85.7l.733-.834 6.2-7.05c.85-.966.5-1.75-.783-1.75" />
    </G>
  </Svg>
);
