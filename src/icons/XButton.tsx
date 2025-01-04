import * as React from 'react';
import Svg, { Circle, G, Path, SvgProps } from 'react-native-svg';

export const XButton = (props: SvgProps) => (
  <Svg width={35} height={34} fill="none" {...props}>
    <Circle cx={17.383} cy={16.998} r={16.665} fill="#fff" fillOpacity={0.5} />
    <G stroke="#fff" strokeLinecap="round" strokeWidth={2.5}>
      <Path d="m12.401 12.347 9.964 9.303M12.4 21.65l9.965-9.303" />
    </G>
  </Svg>
);
