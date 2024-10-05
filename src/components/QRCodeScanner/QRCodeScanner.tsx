import { useEffect, useState } from 'react';
import { Alert, Pressable, SafeAreaView, Text, View } from 'react-native';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import styles from './styles';

export default function QRCodeScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [disableScanner, setDisableScanner] = useState<boolean>(false);

  useEffect(() => {
    // Request camera permissions if not granted on mount
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const onBarcodeScanned = (data: BarcodeScanningResult) => {
    // Disable scanning callback so we don't scan multiple times
    setDisableScanner(true);

    Alert.alert('YUHHHHH QR Code Scanned', data.data, [
      {
        text: 'OK',
        // Enable scanner after 2 seconds of pressing OK
        onPress: () => setTimeout(() => setDisableScanner(false), 2000),
      },
    ]);
  };

  // Camera permissions are still loading.
  if (!permission) {
    return <View />;
  }

  // No perms :(
  if (!permission.granted) {
    return <Text>Bruh you didn't enable perms for the camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraView}>
        <Text style={styles.qrMessage}>
          Align the QR code within the frame to scan
        </Text>
        <CameraView
          style={styles.camera}
          // Disable scanning callback so we don't scan multiple times
          onBarcodeScanned={disableScanner ? undefined : onBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      </View>
      <Pressable style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </SafeAreaView>
  );
}
