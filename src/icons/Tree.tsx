import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

const SvgTree = (props: SvgProps) => (
  <Svg width={35} height={34} fill="none" {...props}>
    <G
      stroke="#446127"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path
        fill="#446127"
        d="M23.207 14.153H11.492c-1.658 0-2.234-1.087-1.264-2.407l5.857-8.03c.689-.962 1.84-.962 2.515 0l5.857 8.03c.984 1.32.408 2.407-1.25 2.407"
      />
      <Path d="M25.202 25.07H9.512c-2.22 0-2.979-1.443-1.672-3.203l5.605-7.714h7.824l5.605 7.714c1.306 1.76.547 3.203-1.672 3.203M17.35 30.57v-5.5" />
    </G>
  </Svg>
);
export default SvgTree;
