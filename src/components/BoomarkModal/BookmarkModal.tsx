import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AddIcon } from '@/icons';
import { styles } from './styles';

interface BottomSheetProps {
  onClose: () => void;
  visible: boolean;
  children?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  onClose,
  visible,
  children,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const handleDismiss = () => {
    closeAnim.start(() => onClose());
  };

  const handleCreateNewFolder = () => {
    console.log('Creating a new bookmark folder...');
    ///create a new modal
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        handleDismiss();
      } else {
        Animated.timing(panY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleDismiss}
    >
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={styles.overlay}>
          <Animated.View
            style={{ ...styles.container, transform: [{ translateY: panY }] }}
            {...panResponder.panHandlers}
          >
            <View style={styles.sliderIndicatorRow}>
              <View style={styles.sliderIndicator} />
            </View>
            <View>
              <Text style={styles.saveText}>Save to Bookmarks</Text>
            </View>
            <View style={styles.foldersList}>
              <View style={styles.createList}>
                <TouchableOpacity
                  style={styles.createList}
                  onPress={handleCreateNewFolder}
                >
                  <AddIcon />
                  <Text style={styles.createText}>Create new list</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomSheet;
