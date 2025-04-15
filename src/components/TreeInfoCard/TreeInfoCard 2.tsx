import React, { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Fruit, Leaf, Ruler, Shapes, Warning, Water } from '@/icons';
import { styles } from './styles';

type TreesInformationCardProps = {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export const TreeInfoCard: React.FC<TreesInformationCardProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.headingStyle}>Properties Key</Text>

              <View style={styles.modalInfo}>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Ruler />
                  </View>
                  <Text style={styles.textStyle}>Height</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Shapes />
                  </View>
                  <Text style={styles.textStyle}>Shape</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Water />
                  </View>
                  <Text style={styles.textStyle}>Water usage</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Warning />
                  </View>
                  <Text style={styles.textStyle}>Root damage potential</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Fruit />
                  </View>
                  <Text style={styles.textStyle}>Litter type</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Leaf />
                  </View>
                  <Text style={styles.textStyle}>Foliage type</Text>
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
