import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { Dropdown as NativeDropdown } from 'react-native-element-dropdown';
import { ChevronDown, ChevronUp } from '@/icons';
import { formatEnumKey } from '@/types/tree';
import { styles } from './styles';

type Option = {
  label: string;
  value: string;
  index: number;
};

type DropdownProps<T extends string[]> = {
  options: T;
  value: string;
  onChange: (value: T[number]) => unknown;
  style?: ViewStyle;
  placeholderStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  inputSearchStyle?: TextStyle;
  itemTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  itemContainerStyle?: TextStyle;
};

export const Dropdown = <T extends string[]>({
  options,
  value,
  onChange,
  style,
  placeholderStyle,
  selectedTextStyle,
  inputSearchStyle,
  itemTextStyle,
  containerStyle,
  itemContainerStyle,
}: DropdownProps<T>): React.JSX.Element => {
  return (
    <View>
      <NativeDropdown
        mode="default"
        style={[styles.dropdown, style]}
        placeholderStyle={[styles.text, placeholderStyle]}
        selectedTextStyle={[
          styles.text,
          { textAlign: 'center' },
          selectedTextStyle,
        ]}
        inputSearchStyle={[styles.text, inputSearchStyle]}
        itemTextStyle={[styles.text, itemTextStyle]}
        containerStyle={[styles.dropdownContainer, containerStyle]}
        dropdownPosition="bottom"
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
                itemContainerStyle,
                selected && styles.selectedBar,
                { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 },
                item.index === 0 && {
                  borderTopLeftRadius: 5,
                },
                item.index === options.length - 1 && {
                  borderBottomLeftRadius: 5,
                },
              ]}
              numberOfLines={2}
            >
              {item.label}
            </Text>
          );
        }}
        renderRightIcon={isVisible =>
          isVisible ? <ChevronUp /> : <ChevronDown />
        }
        onChange={(item: Option) => {
          onChange(item.value);
        }}
        keyboardAvoiding={true}
        autoScroll={false}
      />
    </View>
  );
};
