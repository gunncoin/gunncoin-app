import React, { useState, useEffect, useCallback } from "react";
import { Camera } from "expo-camera";
import { Alert, StyleSheet } from "react-native";
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
import Socket from "react-native-tcp-socket/lib/types/Socket";

const MinerScreen = () => {
  const userPublicAddress = useAppSelector(selectPublicKey);

  const [cameraActive, setCameraActive] = useState(false);
  const [client, setClient] = useState<Socket | null>(null);

  // Config
  const [upnp, setUPNP] = useState(true);
  const [publicAddress, setPublicAddress] = useState(userPublicAddress);

  useFocusEffect(
    useCallback(() => {
      return () => setCameraActive(false);
    }, [])
  );

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setCameraActive(false);
    // { ip: "127.0.0.1", port: 48661 }
    const parsedData = JSON.parse(data);
    const ip: string = parsedData["ip"];
    const port: number = parsedData["port"];
    if (!ip || !port) throw new Error("Cannot parse qr code");

    const tcpClient = TcpSocket.createConnection(
      { port: port, host: ip },
      () => {}
    );

    tcpClient.on("data", (data) => {
      Alert.alert(data.toString());
    });

    tcpClient.on("error", (error) => {
      Alert.alert(error.message);
    });

    setClient(tcpClient);
  };

  const handleClientDisconnect = () => {
    if (!client)
      throw new Error("Client was never connected in the first place");

    client.destroy();
    setClient(null);
  };

  const sendTheFreakingData = () => {
    const message = `${JSON.stringify({
      message: {
        name: "config",
        payload: {
          public_address: publicAddress,
          upnp: upnp,
          start_mining: true,
        },
      },
    })}\n`;
    client?.write(message);
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
        <Button variant="ghost" onPress={() => setCameraActive(false)}>
          Close
        </Button>
      </Box>
      {!cameraActive && (
        <Box>
          <Center>
            <Text fontSize="2xl">Miner Configuration</Text>
            <Text fontSize="xl" color={client ? "success.500" : "error.500"}>
              {client == null && "Not "}Connected
            </Text>
            {client ? (
              <Button onPress={handleClientDisconnect}>Disconnect</Button>
            ) : (
              <Button onPress={() => setCameraActive(true)}>
                Scan Miner QR Code
              </Button>
            )}
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
                <Button flex={1} onPress={sendTheFreakingData}>
                  Start Mining
                </Button>
              </HStack>
            </VStack>
          </Center>
        </Box>
      )}
    </SafeAreaView>
  );
};

export default MinerScreen;
