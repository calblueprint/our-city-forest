import { useEffect, useState } from 'react';
import { Alert, Pressable, SafeAreaView, Text, View } from 'react-native';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './styles';

type QRCodeScannerProps = NativeStackScreenProps<RootStackParamList, 'Scanner'>;

export default function QRCodeScanner({ navigation }: QRCodeScannerProps) {
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

    Alert.alert(
      'YUHHHHH QR Code Scanned',
      `Going to tree page with id: ${data.data}`,
      [
        {
          text: 'OK',
          // Enable scanner after 2 seconds of pressing OK
          onPress: () => navigation.push('TreeInfoPage', { treeId: data.data }),
        },
      ],
    );

    // setTimeout(() => setDisableScanner(false), 2000),
  };

  // Camera permissions are still loading.
  if (!permission) {
    return <View />;
  }

  // No perms :(
  if (!permission.granted) {
    return <Text>Permission for camera not granted.</Text>;
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
