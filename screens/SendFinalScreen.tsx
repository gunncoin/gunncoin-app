import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Center,
  Text,
  IconButton,
  VStack,
  Icon,
  ScrollView,
  Divider,
} from "native-base";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import QRScanner from "../components/Miner/QRScanner";
import { sendMessage, transactionMessage } from "../api";
import { createTransaction } from "../api/messages";
import { useAppSelector } from "../redux/hooks";
import { selectPrivateSeed, selectPublicKey } from "../redux/slices/usersSlice";

type SendFinalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SendFinal"
>;

const SendFinalScreen = ({ route }: SendFinalScreenProps) => {
  const { amount } = route.params;
  const privateKey = useAppSelector(selectPrivateSeed);
  const publicKey = useAppSelector(selectPublicKey);

  const [walletAddress, setWalletAddress] = useState("");
  const [cameraActive, setCameraActive] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => setCameraActive(false);
    }, [])
  );

  const handleWalletInput = (text: string) => {
    setWalletAddress(text);
  };

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setCameraActive(false);

    // TODO: check valid address
    setWalletAddress(data);
  };

  const handleSend = () => {
    sendMessage(
      transactionMessage(
        createTransaction(privateKey, publicKey, walletAddress, amount)
      )
    )
      .then(() => {
        console.log("success");
      })
      .catch((e) => console.log(e));
  };

  const handleTestTransaction = () => {
    const alice_private =
      "bf3f1a7e8911dc9fd0b50e829bb03a301775d0bee630865ad401791e77d21ddc";
    const alices_public =
      "034e06f1d959fe83fd3f65627b7e2e2d3c020f99cd99bcd3a4dd649e65e3a684";
    const bobs_private =
      "9ea1d7796f88ffc8d81e4a345b4dba2af2f2a081e0aa2e22e6b8475486a30baf";
    const bobs_public =
      "81acbfc871192f9d1abf4ca6c65b05b8530c62e27e622dad7aa7642560e4a53c";

    const transaction = createTransaction(
      alice_private,
      alices_public,
      bobs_public,
      3
    );
    console.log(transaction);
  };

  return (
    <Box marginX="5%" h="100%">
      <QRScanner
        enabled={cameraActive}
        handleBarCodeScanned={handleBarCodeScanned}
      />
      <Center>
        <Box w="100%" padding="3">
          <Text color="gray.300">SEND</Text>
          <Text fontSize={"xl"}>{amount} GUNN</Text>
          <Divider marginY={3} />
          <Text marginBottom={2}>To</Text>
          <HStack>
            <Input
              placeholder="Wallet Address"
              flex={1}
              marginRight="1"
              value={walletAddress}
              onChangeText={handleWalletInput}
            />
            <IconButton
              icon={<Icon as={FontAwesome} name="qrcode" />}
              onPress={() => setCameraActive(true)}
            />
          </HStack>
        </Box>
        <Button w="100%" onPress={handleSend}>
          Send!
        </Button>
        <Button onPress={handleTestTransaction}>SEND TEST</Button>
      </Center>
    </Box>
  );
};

export default SendFinalScreen;
