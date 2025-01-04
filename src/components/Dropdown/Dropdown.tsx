import React from 'react';
import { Text, View } from 'react-native';
import { Dropdown as NativeDropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';
import { colors } from '@/styles/colors';
import { formatEnumKey } from '@/types/tree';
import { styles } from './styles';

type DropdownProps<T extends string[]> = {
  options: T;
  onChange: (value: T[number]) => unknown;
  value: string;
};

type Option = {
  label: string;
  value: string;
  index: number;
};

export const Dropdown = <T extends string[]>({
  options,
  onChange,
  value,
}: DropdownProps<T>): React.JSX.Element => {
  return (
    <View>
      <NativeDropdown
        mode="default"
        style={styles.dropdown}
        placeholderStyle={[styles.text, styles.textContainer]}
        selectedTextStyle={[styles.text, styles.textContainer]}
        inputSearchStyle={styles.text}
        itemTextStyle={styles.text}
        containerStyle={styles.dropdownContainer}
        dropdownPosition="bottom"
        iconStyle={styles.iconStyle}
        data={options.map((option: T[number], index: number) => {
          return { index, label: formatEnumKey(option), value: option };
        })}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder="Select..."
        value={value}
        renderItem={(item: Option, selected: boolean | undefined) => {
          return (
            <Text
              style={[
                styles.text,
                styles.itemContainer,
                selected && styles.selectedBar,
                { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 },
                item.index === 0 && {
                  borderTopLeftRadius: 5,
                },
                item.index === options.length - 1 && {
                  borderBottomLeftRadius: 5,
                },
              ]}
            >
              {item.label}
            </Text>
          );
        }}
        renderRightIcon={isVisible =>
          isVisible ? (
            <Icon
              name="arrow-drop-up"
              type="material"
              color={colors.gray4}
              size={24}
            />
          ) : (
            <Icon
              name="arrow-drop-down"
              type="material"
              color={colors.gray4}
              size={24}
            />
          )
        }
        onChange={(item: Option) => {
          onChange(item.value);
        }}
      />
    </View>
  );
};
