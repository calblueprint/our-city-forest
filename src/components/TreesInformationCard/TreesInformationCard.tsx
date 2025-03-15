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

interface TreesInformationCardProps {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const TreesInformationCard: React.FC<TreesInformationCardProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View style={styles.allIcons}>
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
                      <Text>Height</Text>
                    </View>
                    <View style={styles.itemText}>
                      <Text>Water</Text>
                    </View>
                    <View style={styles.itemText}>
                      <Text>Fruit</Text>
                    </View>
                    <View style={styles.itemText}>
                      <Text>Shape</Text>
                    </View>
                    <View style={styles.itemText}>
                      <Text>Utility Friendliness</Text>
                    </View>
                    <View style={styles.itemText}>
                      <Text>Leaf</Text>
                    </View>
                  </View>
                </View>

                {/*
                <View style={styles.iconBlock}>
                  <Ruler />
                  <Text>Height</Text>
                </View>
                <View style={styles.iconBlock}>
                  <WateringCan />
                  <Text>Water</Text> 
                </View>
                <View style={styles.iconBlock}>
                  <Fruit />
                  <Text>Fruit</Text> 
                </View>
                <View style={styles.iconBlock}>
                  <Shapes />
                  <Text>Shape</Text> 
                </View>
                <View style={styles.iconBlock}>
                  <Warning />
                  <Text>Utility Friendliness</Text> 
                </View>
                <View style={styles.iconBlock}>
                  <Leaf />
                  <Text>Leaf</Text> 
                </View>
                */}
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

export default TreesInformationCard;
