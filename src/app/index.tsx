import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Logo from '@/components/Logo';

// Dummy home screen for now? idk what to put here
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Logo />
      <Text>Home Screen!</Text>
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
