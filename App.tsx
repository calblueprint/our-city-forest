import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AddTrees from '@/components/AddTrees/AddTrees';
import Logo from '@/components/Logo';

export default function App() {
  return (
    <View style={styles.container}>
      <Logo />
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <AddTrees />
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
