import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Popover from 'react-native-popover-view';
import { SvgProps } from 'react-native-svg';

/*
const infoMessages: { [key: string]: string } = {
  height: 'Maximum height',
  shape: 'Tree shape',
  water: 'Water usage',
  root: 'Root damage potential',
  litter: 'Type of litter',
  native: 'CA native',
  foliage: 'Foliage',
  utility: 'Utility',
};
*/

type PropertyIconProps = {
  Icon: React.FC<SvgProps>;
  infoKey: string;
  iconProps?: SvgProps;
};

const PropertyIcon: React.FC<PropertyIconProps> = ({
  Icon,
  infoKey,
  iconProps,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Popover isVisible={visible} onRequestClose={() => setVisible(false)}>
        <Text>This is a tooltip!</Text>
      </Popover>

      <TouchableOpacity onPress={() => setVisible(true)}>
        <Icon {...iconProps} />
      </TouchableOpacity>
    </View>
  );
};

export default PropertyIcon;
