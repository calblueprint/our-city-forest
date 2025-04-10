import React, { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Flower, Growth, Ruler, Soil, Sun, Water } from '@/icons';
import { styles } from './styles';

type ShrubInfoCardProps = {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export const ShrubInfoCard: React.FC<ShrubInfoCardProps> = ({
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
                  <Text style={styles.textStyle}>Dimensions</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Soil />
                  </View>
                  <Text style={styles.textStyle}>Dormancy</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Flower />
                  </View>
                  <Text style={styles.textStyle}>Flower color</Text>
                </View>
                {/* <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Water />
                  </View>
                  <Text style={styles.textStyle}>Bloom</Text>
                </View> */}
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Growth />
                  </View>
                  <Text style={styles.textStyle}>Growth rate</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Sun />
                  </View>
                  <Text style={styles.textStyle}>Sun exposure</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Soil />
                  </View>
                  <Text style={styles.textStyle}>Soil needs</Text>
                </View>
                <View style={styles.modalRow}>
                  <View style={styles.iconItem}>
                    <Water />
                  </View>
                  <Text style={styles.textStyle}>Water needs</Text>
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
