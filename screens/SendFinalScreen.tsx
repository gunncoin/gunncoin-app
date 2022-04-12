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
import { Alert } from "react-native";
import { TransactionResponse } from "../api/responseTypes";

type SendFinalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SendFinal"
>;

const SendFinalScreen = ({ route, navigation }: SendFinalScreenProps) => {
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
      .then((res: any) => {
        console.log(res);
        const typedRes = res as TransactionResponse;
        if (typedRes.successful) {
          console.log("TODO: something success message");
          navigation.navigate("Root");
        } else {
          Alert.alert(typedRes.message);
        }
      })
      .catch((e) => Alert.alert("Error", e));
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
      </Center>
    </Box>
  );
};

export default SendFinalScreen;
