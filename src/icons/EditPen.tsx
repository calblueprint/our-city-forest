import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

const SvgEdit = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <G fill="#BDBDBD">
      <Path d="M27.244 28.876H3.994a.976.976 0 0 1-.969-.969c0-.53.44-.968.969-.968h23.25c.53 0 .969.439.969.968 0 .53-.44.97-.97.97M24.686 4.955c-2.505-2.506-4.96-2.57-7.53 0l-1.563 1.562c-.13.13-.18.336-.13.517a10.5 10.5 0 0 0 7.144 7.143c.052.013.103.026.155.026a.52.52 0 0 0 .374-.155l1.55-1.563c1.28-1.266 1.9-2.493 1.9-3.733.012-1.279-.608-2.519-1.9-3.797M20.282 15.352a14 14 0 0 1-1.085-.568 11 11 0 0 1-.827-.542 8 8 0 0 1-.723-.556 1.6 1.6 0 0 1-.22-.194 11 11 0 0 1-1.33-1.343c-.039-.026-.104-.116-.194-.232-.13-.155-.349-.414-.543-.71a7 7 0 0 1-.503-.763 17 17 0 0 1-.569-1.06q-.09-.194-.169-.383a.514.514 0 0 0-.834-.175l-7.56 7.56c-.168.168-.323.49-.362.71l-.697 4.947c-.13.879.116 1.705.658 2.26.465.453 1.111.698 1.809.698q.232 0 .465-.039l4.96-.697c.232-.039.555-.194.71-.362l7.553-7.553a.52.52 0 0 0-.178-.844z" />
    </G>
  </Svg>
);
export default SvgEdit;