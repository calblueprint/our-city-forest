import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.squarespace-cdn.com/content/v1/545bbd7ee4b032c1794c4020/1502738972151-U1234630JTWT5NEITDFG/image-asset.jpeg?format=1500w',
          }}
          style={styles.responsiveImage}
        />

        <View style={styles.overlay}>
          <Text style={styles.Heading4}>Contact Us</Text>
        </View>
      </View>

      <View style={styles.contactInfo}>
        <View>
          <Text style={styles.iconColor}> IconPlaceholder</Text>
        </View>
        <Text style={styles.contactText}>
          123 Berkeley Way, San Jose, CA 95035
        </Text>

        <View>
          <Text style={styles.iconColor}> IconPlaceholder</Text>
        </View>
        <Text style={styles.managerText}>Nursery Manager</Text>
        <Text style={styles.contactText}>123 - 456 - 7890</Text>

        <View>
          <Text style={styles.iconColor}> IconPlaceholder</Text>
        </View>
        <Text style={styles.contactText}>nurserymanager@ourcityforest.org</Text>
      </View>
    </View>
  );
}
