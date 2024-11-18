import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';

export default function App() {
  return (
    <ScrollView style={styles.backgroundContainer}>
      <View style={styles.contactInfo}>
        <View>
          <Text style={styles.Heading4Contact}>Contact Us</Text>
        </View>

        <View>
          <Text style={styles.contactboldText}>Location</Text>
          <Text style={styles.contactText}>
            123 Berkeley Way, San Jose, CA 95035
          </Text>
        </View>

        <View>
          <Text style={styles.contactboldText}>Hours</Text>
          <Text style={styles.contactText}>M-TH | 9 AM - 12 PM</Text>
        </View>

        <View>
          <Text style={styles.contactboldText}>Call</Text>
          <Text style={styles.contactText}>123 - 456 - 7890</Text>
        </View>

        <View>
          <Text style={styles.contactboldText}>Email</Text>
          <Text style={styles.contactText}>
            nurserymanager@ourcityforest.org
          </Text>
        </View>

        <View>
          <Text style={styles.contactText}>Instagram - Facebook</Text>
        </View>
      </View>
    </ScrollView>
  );
}
