import React from "react";
import { Box, Button, Center, VStack } from "native-base";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keys, theme } from "../constants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectPrivateSeed,
  selectPublicKey,
  setLoggedIn,
  setPrivateSeed,
  setPublicKey,
} from "../redux/slices/usersSlice";
import { setIsLoading } from "../redux/slices/uiSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const dispatch = useAppDispatch();
  const privateSeed = useAppSelector(selectPrivateSeed);
  const publicKey = useAppSelector(selectPublicKey);

  const handleDeleteData = async () => {
    // Check for private/public keys
    if (Platform.OS == "ios" || Platform.OS == "android") {
      await SecureStore.deleteItemAsync(keys.PRIVATE_SEED);
      await SecureStore.deleteItemAsync(keys.PUBLIC_KEY);

      dispatch(setLoggedIn(false));
      dispatch(setPrivateSeed(""));
      dispatch(setPublicKey(""));
    } else {
      await AsyncStorage.removeItem(keys.PRIVATE_SEED);
      await AsyncStorage.removeItem(keys.PUBLIC_KEY);

      dispatch(setLoggedIn(false));
      dispatch(setPrivateSeed(""));
      dispatch(setPublicKey(""));
    }
  };

  const printKeysToConsole = () => {
    console.log("Private Seed");
    console.log(privateSeed);
    console.log("Public Key");
    console.log(publicKey);
  };

  return (
    <SafeAreaView>
      <Box w="100%" paddingX="5%">
        <VStack w="100%" space={5}>
          <Button onPress={handleDeleteData}>Delete Wallet</Button>
          <Button onPress={printKeysToConsole}>Print Keys to Console</Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default Settings;
