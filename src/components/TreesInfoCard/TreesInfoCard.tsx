import React, { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Fruit, Leaf, Ruler, Shapes, Warning, WateringCan } from '@/icons';
import { styles } from './styles';

type TreesInformationCardProps = {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const TreesInfoCard: React.FC<TreesInformationCardProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 20,
                width: '80%',
              }}
            >
              <View style={styles.allIcons}>
                <View style={styles.headingBlock}>
                  <Text style={styles.headingStyle}> Property Key </Text>

                  <View style={styles.iconBlock}>
                    <View style={styles.allIcons}>
                      <View style={styles.item}>
                        <Ruler />
                      </View>
                      <View style={styles.item}>
                        <WateringCan />
                      </View>
                      <View style={styles.item}>
                        <Fruit />
                      </View>
                      <View style={styles.item}>
                        <Shapes />
                      </View>
                      <View style={styles.item}>
                        <Warning />
                      </View>
                      <View style={styles.item}>
                        <Leaf />
                      </View>
                    </View>

                    <View style={styles.allText}>
                      <View style={styles.itemText}>
                        <Text style={styles.textStyle}>Height</Text>
                      </View>
                      <View style={styles.itemText}>
                        <Text style={styles.textStyle}>Water</Text>
                      </View>
                      <View style={styles.itemText}>
                        <Text style={styles.textStyle}>Fruit</Text>
                      </View>
                      <View style={styles.itemText}>
                        <Text style={styles.textStyle}>Shape</Text>
                      </View>
                      <View style={styles.itemText}>
                        <Text style={styles.textStyle}>
                          Utility Friendliness
                        </Text>
                      </View>
                      <View style={styles.itemText}>
                        <Text style={styles.textStyle}>Leaf</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              {children}
              <Pressable onPress={onClose}></Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
