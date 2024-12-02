import type { SVGProps } from 'react';
import * as React from 'react';

const SvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M7.45 9.022.705.643h5.341l4.163 5.18L14.656.666h2.942l-5.966 6.925 7.074 8.801h-5.325l-4.507-5.6-4.812 5.585H1.105zm6.707 5.819L3.981 2.196h1.29L15.433 14.84z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgX;
