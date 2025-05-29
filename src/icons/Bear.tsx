import * as React from 'react';
import Svg, { Ellipse, Path, SvgProps } from 'react-native-svg';

export const Bear = (props: SvgProps) => (
  <Svg width={31} height={25} fill="none" {...props}>
    <Ellipse
      cx={5.402}
      cy={5.264}
      fill="#446127"
      rx={5.402}
      ry={5.264}
      transform="matrix(-1 0 0 1 29.303 .954)"
    />
    <Ellipse cx={15.285} cy={13.372} fill="#9BA98C" rx={10.449} ry={10.182} />
    <Ellipse
      cx={5.402}
      cy={5.264}
      fill="#9BA98C"
      rx={5.402}
      ry={5.264}
      transform="matrix(-1 0 0 1 12.379 .954)"
    />
    <Ellipse cx={19.788} cy={12.329} fill="#446127" rx={1.07} ry={1.043} />
    <Ellipse cx={10.781} cy={12.328} fill="#446127" rx={1.069} ry={1.041} />
    <Path
      fill="#446127"
      d="M14.784 16.955a.7.7 0 0 0 1.003 0l1.126-1.156a.7.7 0 0 0-.502-1.189h-2.252a.7.7 0 0 0-.501 1.189z"
    />
  </Svg>
);
