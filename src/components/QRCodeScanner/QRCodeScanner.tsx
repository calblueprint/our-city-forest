import { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import styles from './styles';

type QRCodeScannerProps = NativeStackScreenProps<RootStackParamList, 'Scanner'>;

export default function QRCodeScanner({ navigation }: QRCodeScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [qrCodeFound, setQrCodeFound] = useState<boolean>(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [flashEnabled, setFlashEnabled] = useState<boolean>(false);

  const resetQrCodeFound = () => {
    setQrCodeFound(false);
    setQrCodeData(null);
  };
  let qrCodeFoundTimeout: ReturnType<typeof setTimeout> | null = null;

  useEffect(() => {
    console.log('flash enabled', flashEnabled);
  }, [flashEnabled]);

  useEffect(() => {
    // Request camera permissions if not granted on mount
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const onBarcodeScanned = (data: BarcodeScanningResult) => {
    if (data.data) {
      setQrCodeFound(true);
      setQrCodeData(data.data);
    }

    if (qrCodeFoundTimeout) {
      clearTimeout(qrCodeFoundTimeout);
    }
    qrCodeFoundTimeout = setTimeout(resetQrCodeFound, 1000);
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
      <View style={styles.iconFlex}>
        <TouchableOpacity onPress={() => setFlashEnabled(!flashEnabled)}>
          <Text style={styles.icon}>Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cameraView}>
        <View style={styles.textFlex}>
          <Text style={styles.header}>Scan QR Code</Text>
          <Text style={styles.subtext}>Aim the camera at the tree's code</Text>
        </View>

        <CameraView
          style={styles.camera}
          onBarcodeScanned={onBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          enableTorch={flashEnabled}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.scanButton,
          qrCodeFound ? styles.scanButtonEnabled : styles.scanButtonDisabled,
        ]}
        onPress={() =>
          navigation.push('TreeInfoPage', { treeId: qrCodeData ?? '' })
        }
        disabled={!qrCodeFound}
      >
        <Text style={styles.scanButtonText}>Scan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
