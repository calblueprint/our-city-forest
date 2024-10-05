import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import QRCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';

export default function StartPage() {
  return (
    <View style={styles.container}>
      <QRCodeScanner />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
