import { Text, View } from 'react-native';
import { Dropdown as DropdownElement } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';
import colors from '@/colors';
import styles from './styles';

type DropdownProps = {
  options: string[];
  setValue: (value: string) => any;
  value: string;
};

type Option = {
  label: string;
  value: string;
};

function Dropdown({ options, setValue, value }: DropdownProps) {
  return (
    <View>
      <DropdownElement
        mode="default"
        style={styles.dropdown}
        placeholderStyle={styles.text}
        selectedTextStyle={[styles.text, styles.black3]}
        inputSearchStyle={styles.text}
        itemTextStyle={[styles.text, styles.gray4]}
        containerStyle={styles.dropdownContainer}
        dropdownPosition="bottom"
        itemContainerStyle={styles.itemContainer}
        iconStyle={styles.iconStyle}
        data={options.map(option => {
          return { label: option, value: option };
        })}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder="Select Option"
        value={value}
        renderItem={(item: Option, selected: boolean | undefined) => (
          <Text style={[styles.text, styles.gray4, styles.itemContainer]}>
            {item.value}
          </Text>
        )}
        renderRightIcon={() => (
          <Icon
            name="arrow-drop-down"
            type="material"
            color={colors.gray4}
            size={24}
          />
        )}
        onChange={(item: Option) => {
          setValue(item.value);
        }}
      />
    </View>
  );
}

export default Dropdown;
