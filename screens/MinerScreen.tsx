import React, { useState, useEffect, useCallback } from "react";
import { Camera } from "expo-camera";
import { StyleSheet } from "react-native";
import TcpSocket from "react-native-tcp-socket";
import {
  Box,
  Button,
  Text,
  Center,
  HStack,
  Checkbox,
  VStack,
  Input,
} from "native-base";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import QRScanner from "../components/Miner/QRScanner";
import { useFocusEffect } from "@react-navigation/native";
import { useAppSelector } from "../redux/hooks";
import { selectPublicKey } from "../redux/slices/usersSlice";

const MinerScreen = () => {
  const userPublicAddress = useAppSelector(selectPublicKey);

  const [cameraActive, setCameraActive] = useState(false);
  const [connected, setConnected] = useState(false);
  const [minerIp, setMinerIp] = useState("");
  const [minerPort, setMinerPort] = useState(48661);

  // Config
  const [upnp, setUPNP] = useState(true);
  const [publicAddress, setPublicAddress] = useState(userPublicAddress);

  useFocusEffect(
    useCallback(() => {
      return () => setCameraActive(false);
    }, [])
  );

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {};

  const handleSaveConfig = () => {
    TcpSocket.createConnection({ port: minerPort, host: minerIp }, () => {
      console.log("Connected");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box
        style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <QRScanner
          handleBarCodeScanned={handleBarCodeScanned}
          enabled={cameraActive}
        />
      </Box>
      <Box>
        <Center>
          <Text fontSize="2xl">Miner Configuration</Text>
          <Text fontSize="xl">Not Connected</Text>
          <Button onPress={() => setCameraActive(true)}>
            Scan Miner QR Code
          </Button>
          <Text>(Must be connected to same network)</Text>
        </Center>
        <Center bg="gray.700">
          <VStack w="95%" space={2}>
            <Text fontSize="2xl">Configer</Text>
            <Checkbox
              value="upnp"
              defaultIsChecked
              onChange={(val) => setUPNP(val)}
            >
              Enable UPNP
            </Checkbox>
            <Input
              placeholder="Public Address"
              value={publicAddress}
              onChangeText={(addr) => setPublicAddress(addr)}
            />
            <Text fontSize="lg">Etc</Text>
            <HStack space={2} w="100%">
              <Button flex={1}>Save Config</Button>
              <Button flex={1}>Start Mining</Button>
            </HStack>
          </VStack>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default MinerScreen;
