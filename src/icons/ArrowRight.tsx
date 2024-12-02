import type { SVGProps } from 'react';
import * as React from 'react';

const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="#446127"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m6.964 14.586 4.458-4.618a1.443 1.443 0 0 0 0-1.984L6.964 3.366"
    />
  </svg>
);
export default SvgArrowRight;
