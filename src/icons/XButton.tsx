import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const XButton = (props: SvgProps) => (
  <Svg width={34} height={34} fill="none" {...props}>
    <Circle cx={17.002} cy={16.92} r={16.665} fill="#fff" />
    <Path
      stroke="#1D1D1D"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m12.02 12.269 9.963 9.303M12.02 21.571l9.964-9.302"
    />
  </Svg>
);
