import React, { useState } from "react";
import { Platform } from "react-native";
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
} from "native-base";
import { icons } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectPrivateSeed,
  selectPublicKey,
  setLoggedIn,
  setPrivateSeed,
  setPublicKey,
} from "../redux/slices/usersSlice";
import { nacl } from "react-native-tweetnacl";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keys } from "../constants";

const LoginPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [privateSeedVisible, setPrivateSeedVisible] = useState(false);
  const privateSeed = useAppSelector(selectPrivateSeed);
  const publicKey = useAppSelector(selectPublicKey);

  const dispatch = useAppDispatch();

  const handleCreateWallet = async () => {
    setExpanded(true);

    // Generate key pair
    const seed = nacl.randomBytes(32);
    const keyPair = nacl.sign.keyPair.fromSeed(seed);
    const seedHex = Buffer.from(seed).toString("hex");
    const publicHex = Buffer.from(keyPair.publicKey).toString("hex");

    if (Platform.OS === "ios" || Platform.OS === "android") {
      await SecureStore.setItemAsync(keys.PRIVATE_SEED, seedHex);
      await SecureStore.setItemAsync(keys.PUBLIC_KEY, publicHex);
    } else {
      await AsyncStorage.setItem(keys.PRIVATE_SEED, seedHex);
      await AsyncStorage.setItem(keys.PUBLIC_KEY, publicHex);
    }

    dispatch(setPrivateSeed(seedHex));
    dispatch(setPublicKey(publicHex));
  };

  const handleEnter = () => [dispatch(setLoggedIn(true))];

  return (
    <Center bg="coolGray.900" h="100%" w="100%">
      <Center paddingX="5%" w="100%">
        <Center bg="gray.800" rounded="lg" w="80%" paddingY="15px">
          <Text fontSize="xl" bold>
            {!expanded ? "Welcome to Gunncoin!" : "Created new Wallet"}
          </Text>
          {!expanded ? (
            <Button
              rounded="sm"
              bg="white"
              w="90%"
              marginTop={"5"}
              onPress={handleCreateWallet}
            >
              Create Wallet
            </Button>
          ) : (
            <Box marginTop="5" paddingX="2" width="100%">
              <Text fontSize="lg">Private Seed:</Text>
              {privateSeedVisible ? (
                <Text>{privateSeed}</Text>
              ) : (
                <Button
                  variant={"ghost"}
                  onPress={() => setPrivateSeedVisible(true)}
                >
                  Show Private Seed
                </Button>
              )}
              <Text fontSize="lg">Public Key: </Text>
              <Text>{publicKey}</Text>
              <Button onPress={handleEnter} marginTop="3">
                Enter!
              </Button>
            </Box>
          )}
        </Center>
      </Center>
    </Center>
  );
};

export default LoginPage;
