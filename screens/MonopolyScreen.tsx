import React from "react";
import {
  Box,
  Center,
  Container,
  Divider,
  Icon,
  IconButton,
  Text,
  Button,
  HStack,
  VStack,
  ScrollView,
  Input,
} from "native-base";
import { icons } from "../constants";
import { createIconSetFromFontello, FontAwesome } from "@expo/vector-icons";
import { useAppDispatch } from "../redux/hooks";
import { setLoggedIn } from "../redux/slices/usersSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import BleManager from "react-native-ble-manager";

const MonopolyScreen = () => {
  const dispatch = useAppDispatch();

  const initBluetooth = () => {
    BleManager.start({ showAlert: true }).then(() => {
      console.log("initialized");
    });
  };

  const scanBluetooth = () => {
    BleManager.scan([], 5, true).then(() => {});
  };

  const stopScan = () => {
    BleManager.stopScan().then(() => {
      console.log("Stopped");
    });
  };

  const RSSI = () => {
    BleManager.readRSSI("56:5c:5c:61:eb:c6").then((rssi) => {
      console.log(rssi);
    });
  };

  return (
    <SafeAreaView>
      <Box marginX="5%">
        <Button onPress={scanBluetooth}>INIT</Button>
        <Button onPress={scanBluetooth}>SCAN</Button>
        <Button onPress={stopScan}>STOP SCAN</Button>
        <Button onPress={RSSI}>RSSI</Button>
      </Box>
    </SafeAreaView>
  );
};

export default MonopolyScreen;
