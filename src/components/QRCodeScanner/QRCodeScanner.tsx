import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashCircle, XButton } from '@/icons';
import { HomeStackParamList } from '@/types/navigation';
import { styles } from './styles';

type QRCodeScannerProps = NativeStackScreenProps<
  HomeStackParamList,
  'QRCodeScanner'
>;

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ navigation }) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [qrCodeFound, setQrCodeFound] = useState<boolean>(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [flashEnabled, setFlashEnabled] = useState<boolean>(false);

  const lastQrDetectionTimeRef = useRef<number>(0); // timestamp ref

  const resetQrCodeFound = () => {
    setQrCodeFound(false);
    setQrCodeData(null);
  };

  const handleBarcodeScanned = (data: BarcodeScanningResult) => {
    setQrCodeFound(true);
    setQrCodeData(data.data);

    // store timestamp for when barcode is detected
    lastQrDetectionTimeRef.current = Date.now();
  };

  // reset status when qr code absent for too long
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (qrCodeFound && Date.now() - lastQrDetectionTimeRef.current > 500) {
        resetQrCodeFound();
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, [qrCodeFound]);

  useEffect(() => {
    // Request camera permissions if not granted on mount
    if (!cameraPermission?.granted) {
      requestCameraPermission();
    }
  }, [cameraPermission, requestCameraPermission]);

  // Camera permissions are still loading.
  if (!cameraPermission) {
    return <View />;
  }

  // No perms :(
  if (!cameraPermission.granted) {
    return <Text>Permission for camera not granted.</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topActions}>
          <TouchableOpacity onPress={() => setFlashEnabled(!flashEnabled)}>
            <FlashCircle />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <XButton />
          </TouchableOpacity>
        </View>

        <View style={styles.mainFlex}>
          <View style={styles.textFlex}>
            <Text style={styles.header}>Scan QR Code</Text>
            <Text style={styles.subtext}>
              Aim the camera at the tree's code
            </Text>
          </View>

          <View
            style={[styles.cameraView, qrCodeFound && styles.qrCodeFoundCamera]}
          >
            <CameraView
              style={[styles.camera]}
              onBarcodeScanned={handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
              enableTorch={flashEnabled}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.scanButton,
            qrCodeFound ? styles.scanButtonEnabled : styles.scanButtonDisabled,
          ]}
          onPress={() =>
            navigation.push('TreeInfo', { treeId: qrCodeData ?? '' })
          }
          disabled={!qrCodeFound}
        >
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
