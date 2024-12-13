import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgYoutube = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M19.918 5.184H8.668c-3.375 0-5.625 2.417-5.625 6.042v7.25c0 3.625 2.25 6.042 5.625 6.042h11.25c3.375 0 5.625-2.417 5.625-6.042v-7.25c0-3.625-2.25-6.042-5.625-6.042m-3.499 10.912-2.779 1.788c-1.125.725-2.047.17-2.047-1.245v-3.588c0-1.414.922-1.97 2.047-1.245l2.78 1.788c1.068.701 1.068 1.813 0 2.502"
    />
  </Svg>
);
export default SvgYoutube;
