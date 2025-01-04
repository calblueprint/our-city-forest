import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addMultipleTrees, generateQRImage } from '@/supabase/queries/trees';
import { styles } from './styles';

export function AddTrees() {
  const [speciesName, setSpeciesName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddTree = async () => {
    try {
      // Get tree IDs from addMultipleTrees
      const treeIds = await addMultipleTrees(speciesName, quantity);

      // Generate QR codes for each tree
      for (const treeId of treeIds) {
        generateQRImage(treeId);
      }

      // Clear form and show success message
      setSpeciesName('');
      setQuantity(1);
      Alert.alert('Success', `Added ${quantity} ${speciesName} trees`);
    } catch (error) {
      console.error('Error adding trees:', error);
      Alert.alert('Error', 'Failed to add trees. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Trees</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Species Name</Text>
        <View style={styles.searchContainer}>
          <TextInput
            value={speciesName}
            onChangeText={text => setSpeciesName(text)}
            placeholder="Search for tree species..."
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Quantity</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleAddTree} style={styles.completeButton}>
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
}
