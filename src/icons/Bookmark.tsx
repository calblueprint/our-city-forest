import * as React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

export const Bookmark = (props: SvgProps) => (
  <Svg width={31} height={31} viewBox="0 0 31 31" fill="none" {...props}>
    <Rect x={0.097} y={0.5} width={30} height={30} rx={15} fill="white" />
    <Path
      d="M10.097 21.286V11c0-.71.576-1.286 1.286-1.286h6.429c.71 0 1.286.576 1.286 1.286v10.286l-3.805-2.446a1.179 1.179 0 0 0-1.39 0l-3.805 2.446Z"
      stroke="#333"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
