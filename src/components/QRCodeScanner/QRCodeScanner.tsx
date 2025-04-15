import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import { FlashCircle, XButton } from '@/icons';
import { getTreeInfo, validateTreeExists } from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import { styles } from './styles';

type QRCodeScannerProps = NativeStackScreenProps<
  HomeStackParamList,
  'QRCodeScanner'
>;

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ navigation }) => {
  const { isAuthenticated } = useAuth();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [qrCodeFound, setQrCodeFound] = useState<boolean>(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [flashEnabled, setFlashEnabled] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const lastQrDetectionTimeRef = useRef<number>(0); // Timestamp ref

  const resetQrCodeFound = () => {
    setQrCodeFound(false);
    setQrCodeData(null);
  };

  const handleBarcodeScanned = (data: BarcodeScanningResult) => {
    setQrCodeFound(true);
    setQrCodeData(data.data);

    // Store timestamp for when barcode is detected
    lastQrDetectionTimeRef.current = Date.now();
  };

  // Reset status when qr code absent for too long
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (qrCodeFound && Date.now() - lastQrDetectionTimeRef.current > 500) {
        resetQrCodeFound();
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [qrCodeFound]);

  useEffect(() => {
    // Request camera permissions if not granted on mount
    if (!cameraPermission?.granted) {
      requestCameraPermission();
    }
  }, [cameraPermission, requestCameraPermission]);

  const handleScan = async () => {
    if (!qrCodeData || isProcessing) return;

    try {
      setIsProcessing(true);
      const exists = await validateTreeExists(qrCodeData);

      if (exists) {
        if (isAuthenticated) {
          navigation.push('TreeInfo', { treeId: qrCodeData });
        } else {
          const treeData = await getTreeInfo(qrCodeData);
          if (treeData && treeData.species?.name) {
            navigation.push('TreeSpeciesInfo', {
              speciesName: treeData.species.name,
            });
          } else {
            Alert.alert(
              'Error',
              'Could not retrieve tree species information.',
              [{ text: 'OK' }],
            );
          }
        }
      } else {
        Alert.alert(
          'Invalid QR Code',
          'This QR code is not associated with any tree in our database.',
          [{ text: 'OK' }],
        );
      }
    } catch {
      Alert.alert('Error', 'Failed to process the QR code. Please try again.', [
        { text: 'OK' },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Camera permissions are still loading.
  if (!cameraPermission) {
    return <View />;
  }

  // Permission not granted.
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
            isProcessing && { opacity: 0.7 },
          ]}
          onPress={handleScan}
          disabled={!qrCodeFound || isProcessing}
        >
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
