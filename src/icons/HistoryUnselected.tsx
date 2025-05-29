import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const HistoryUnselected = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      stroke="#446127"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.625 11.875L15.375 17.125L13.375 14.125L9.375 18.125"
    />
    <Path
      stroke="#446127"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.125 11.875H20.625V14.375"
    />
    <Path
      stroke="#446127"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
    />
  </Svg>
);
