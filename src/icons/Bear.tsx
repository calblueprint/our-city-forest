import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

const SvgBear = (props: SvgProps) => (
  <Svg width={37} height={33} fill="none" {...props}>
    <Circle
      cx={6.058}
      cy={6.058}
      r={6.058}
      fill="#446127"
      transform="matrix(-1 0 0 1 33.991 3.759)"
    />
    <Circle cx={18.27} cy={18.05} r={11.719} fill="#9BA98C" />
    <Circle
      cx={6.058}
      cy={6.058}
      r={6.058}
      fill="#9BA98C"
      transform="matrix(-1 0 0 1 15.01 3.759)"
    />
    <Circle cx={23.32} cy={16.85} r={1.2} fill="#446127" />
    <Circle cx={13.219} cy={16.849} r={1.199} fill="#446127" />
    <Path
      fill="#446127"
      d="M17.763 22.232a.7.7 0 0 0 1.015 0l1.494-1.575a.7.7 0 0 0-.508-1.181h-2.987a.7.7 0 0 0-.508 1.181z"
    />
  </Svg>
);
export default SvgBear;
