import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

export const User = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <G fill="#446127">
      <Path d="M12.119 12.968a5 5 0 1 0 0-10 5 5 0 0 0 0 10M12.119 15.468c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5" />
    </G>
  </Svg>
);
