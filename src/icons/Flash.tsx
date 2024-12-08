import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

const SvgFlash = (props: SvgProps) => (
  <Svg width={31} height={31} fill="none" {...props}>
    <G fill="#446127">
      <Path d="M15.44 4.702v20.825l-1 1.137c-1.388 1.575-2.525 1.15-2.525-.95v-9H8.052c-1.75 0-2.237-1.075-1.075-2.387z" />
      <Path
        d="m23.902 15.902-8.462 9.625V4.701l1-1.138c1.387-1.575 2.525-1.15 2.525.95v9h3.862c1.75 0 2.238 1.075 1.075 2.388"
        opacity={0.4}
      />
    </G>
  </Svg>
);
export default SvgFlash;
