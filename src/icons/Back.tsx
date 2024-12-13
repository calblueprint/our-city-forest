import type { SVGProps } from 'react';
import * as React from 'react';

const SvgBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M7.442 14.69 1.33 8.087m0 0 6.113-6.603M1.33 8.087H16"
    />
  </svg>
);
export default SvgBack;
