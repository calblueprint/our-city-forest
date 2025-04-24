import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const LogOut = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path
      stroke="#446127"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.77 8.797c.323-3.75 2.25-5.281 6.47-5.281h.135c4.656 0 6.52 1.864 6.52 6.52v6.792c0 4.656-1.864 6.521-6.52 6.521h-.136c-4.187 0-6.114-1.51-6.458-5.198M16.125 13.422H4.27M6.594 9.932l-3.49 3.49 3.49 3.49"
    />
  </Svg>
);
