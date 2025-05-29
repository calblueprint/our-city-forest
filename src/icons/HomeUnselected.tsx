import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const HomeUnselected = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      fill="#446127"
      d="m15 1.422.65-.76a1 1 0 0 0-1.3 0zm-14 12-.65-.76-.35.3v.46zm10 16v1a1 1 0 0 0 1-1zm8 0h-1a1 1 0 0 0 1 1zm10-16h1v-.46l-.35-.3zm-26 17h8v-2H3zm26.65-17.76-14-12-1.3 1.52 14 12zm-15.3-12-14 12 1.3 1.52 14-12zM12 29.422v-6h-2v6zm6-6v6h2v-6zm1 7h8v-2h-8zm11-3v-14h-2v14zm-30-14v14h2v-14zm15 7a3 3 0 0 1 3 3h2a5 5 0 0 0-5-5zm0-2a5 5 0 0 0-5 5h2a3 3 0 0 1 3-3zm12 12a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1zm-24-2a1 1 0 0 1-1-1H0a3 3 0 0 0 3 3z"
    />
  </Svg>
);
