import { Text, View } from 'react-native';
import { Dropdown as DropdownElement } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';
import { colors } from '@/styles/colors';
import { styles } from './styles';

type DropdownProps<T extends string[]> = {
  options: T;
  setValue: (value: T[number]) => unknown;
  value: string;
  displayValue?: (s: string) => string;
};

type Option = {
  label: string;
  value: string;
  i: number;
};

export function Dropdown<T extends string[]>({
  options,
  setValue,
  value,
  displayValue = s => s,
}: DropdownProps<T>) {
  return (
    <View>
      <DropdownElement
        mode="default"
        style={styles.dropdown}
        placeholderStyle={[styles.text, styles.textContainer]}
        selectedTextStyle={[styles.text, styles.textContainer]}
        inputSearchStyle={styles.text}
        itemTextStyle={styles.text}
        containerStyle={styles.dropdownContainer}
        dropdownPosition="bottom"
        iconStyle={styles.iconStyle}
        data={options.map((option: T[number], i: number) => {
          return { i, label: displayValue(option), value: option };
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
                item.i === 0 && {
                  borderTopLeftRadius: 5,
                },
                item.i === options.length - 1 && {
                  borderBottomLeftRadius: 5,
                },
              ]}
            >
              {item.label}
            </Text>
          );
        }}
        renderRightIcon={visible =>
          visible ? (
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
          setValue(item.value);
        }}
      />
    </View>
  );
}
