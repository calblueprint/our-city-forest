import { Text, View } from 'react-native';
import { Dropdown as DropdownElement } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';
import colors from '@/styles/colors';
import styles from './styles';

type DropdownProps<T extends string[]> = {
  options: T;
  setValue: (value: T[number]) => any;
  value: string;
};

type Option = {
  i: number;
  value: string;
};

function Dropdown<T extends string[]>({
  options,
  setValue,
  value,
}: DropdownProps<T>) {
  return (
    <View>
      <DropdownElement
        mode="default"
        style={styles.dropdown}
        placeholderStyle={[styles.text, styles.textContainer]}
        selectedTextStyle={[styles.text, styles.textContainer]}
        inputSearchStyle={styles.text}
        itemTextStyle={[styles.text, styles.gray4]}
        containerStyle={styles.dropdownContainer}
        dropdownPosition="bottom"
        iconStyle={styles.iconStyle}
        data={options.map((option: T[number], i: number) => {
          return { i, value: option };
        })}
        maxHeight={400}
        labelField="value"
        valueField="value"
        placeholder="Select..."
        value={value}
        renderItem={(item: Option, selected: boolean | undefined) => {
          return (
            <Text
              style={[
                styles.text,
                styles.gray4,
                styles.itemContainer,
                selected && styles.selectedBar,
                { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 },
                item.i == 0 && {
                  borderTopLeftRadius: 5,
                },
                item.i === options.length - 1 && {
                  borderBottomLeftRadius: 5,
                },
              ]}
            >
              {item.value}
            </Text>
          );
        }}
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
