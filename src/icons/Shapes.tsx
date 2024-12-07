import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

const SvgShapes = (props: SvgProps) => (
  <Svg width={31} height={31} fill="none" {...props}>
    <G fill="#446127">
      <Path d="M17.352 19.14H6.065c-2.275 0-3.725-2.438-2.625-4.438l2.912-5.3 2.725-4.963c1.138-2.062 4.113-2.062 5.25 0l2.738 4.963 1.312 2.387 1.6 2.913c1.1 2-.35 4.437-2.625 4.437" />
      <Path
        d="M28.065 19.764a8.125 8.125 0 0 1-8.125 8.125 8.125 8.125 0 0 1-8.125-8.125c0-.212.012-.412.025-.625h5.512c2.275 0 3.725-2.437 2.625-4.437l-1.6-2.913a8.125 8.125 0 0 1 9.688 7.975"
        opacity={0.4}
      />
    </G>
  </Svg>
);
export default SvgShapes;
