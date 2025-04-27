import React, { useState, useRef, useEffect } from 'react';
import { 
  Modal, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Animated,
  Dimensions
} from 'react-native';
import { styles } from './styles';
import { AddIcon } from '@/icons'; 

type CreateFolderModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => void;
};

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  visible,
  onClose,
  onCreate 
}) => {
  const [folderName, setFolderName] = useState('');
  const screenHeight = Dimensions.get('screen').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 50);
    }
  }, [visible, translateY]);

  const handleCreate = () => {
    if (folderName.trim()) {
      onCreate(folderName.trim());
      setFolderName('');
    }
  };

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      setFolderName('');
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.popupBox,
            { transform: [{ translateY }] }
          ]}
        >
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
          >
            <AddIcon />  
          </TouchableOpacity>

          <Text style={styles.popupTitle}>Create new list</Text>
          <Text style={styles.nameText}>Name</Text>
          <TextInput
            style={styles.input}
            value={folderName}
            onChangeText={setFolderName}
            placeholder="Folder name"
            maxLength={20}
          />
          <Text style={styles.charactersText}>
            {folderName.length} / 20 characters
          </Text>
          <View style={styles.addFolderButtons}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setFolderName('')}  
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button, 
                styles.createButton,
                !folderName.trim() && styles.disabledButton
              ]}
              onPress={handleCreate}
              disabled={!folderName.trim()}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};