import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import GoogleSignOutButton from '@/components/GoogleSignOutButton/GoogleSignOutButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ContactStackParamList } from '@/types/navigation';

type ContactScreenProps = NativeStackScreenProps<ContactStackParamList, "Contact">;

export default function ContactScreen({ navigation, route }: ContactScreenProps) {
  return (
    <ScrollView style={styles.backgroundContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.squarespace-cdn.com/content/v1/545bbd7ee4b032c1794c4020/1502738972151-U1234630JTWT5NEITDFG/image-asset.jpeg?format=1500w',
          }}
          style={styles.contactImage}
        />

        <View style={styles.contactOverlay}></View>
      </View>

      <View style={styles.contactInfo}>

        {/* temporary button */}
        <GoogleSignOutButton navigation={navigation} route={route}/>
        
        <View>
          <Text style={styles.contactHeader}>Contact Us</Text>
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
