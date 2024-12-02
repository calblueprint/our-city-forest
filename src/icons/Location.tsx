import type { SVGProps } from 'react';
import * as React from 'react';

const SvgLocation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={29}
    fill="none"
    {...props}
  >
    <g clipPath="url(#location_svg__a)">
      <path
        fill="#446127"
        d="M24.51 10.835c-1.211-5.39-5.861-7.817-9.946-7.817h-.011c-4.074 0-8.735 2.415-9.947 7.805-1.35 6.02 2.296 11.118 5.597 14.327a6.24 6.24 0 0 0 4.361 1.785c1.57 0 3.139-.595 4.35-1.785 3.3-3.209 6.946-8.295 5.596-14.315m-9.946 5.845c-2.008 0-3.635-1.646-3.635-3.675s1.627-3.676 3.635-3.676 3.635 1.646 3.635 3.675-1.627 3.676-3.635 3.676"
      />
    </g>
    <defs>
      <clipPath id="location_svg__a">
        <path fill="#fff" d="M.718.976H28.41v28H.718z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLocation;
