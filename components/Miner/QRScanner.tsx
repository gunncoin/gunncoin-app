import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { Box, Button, Text } from "native-base";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";

const QRScanner = ({
  handleBarCodeScanned,
  enabled,
}: {
  handleBarCodeScanned: BarCodeScannedCallback;
  enabled: boolean;
}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    if (enabled) {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }
  }, [enabled]);

  if (!enabled) return <></>;

  return (
    <Box flex={1} bg="black">
      {hasPermission ? (
        <Camera
          onBarCodeScanned={handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          style={{ flex: 1 }}
          type={type}
        ></Camera>
      ) : (
        <Text>Please turn on camera permissions</Text>
      )}
    </Box>
  );
};

export default QRScanner;
