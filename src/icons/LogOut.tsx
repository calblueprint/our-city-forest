import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgLogOut = (props: SvgProps) => (
  <Svg width={24} height={21} fill="none" {...props}>
    <Path
      stroke="#446127"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21.5 10.422H9.625m9.375 3.5 3.75-3.5-3.75-3.5m-6.25-2.333V3.422c0-.619-.263-1.212-.732-1.65a2.6 2.6 0 0 0-1.768-.683H4c-.663 0-1.299.245-1.768.683a2.26 2.26 0 0 0-.732 1.65v14c0 .619.263 1.212.732 1.65A2.6 2.6 0 0 0 4 19.755h6.25c.663 0 1.299-.245 1.768-.683a2.26 2.26 0 0 0 .732-1.65v-1.167"
    />
  </Svg>
);
export default SvgLogOut;
