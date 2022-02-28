import React from "react";
import { Box, Button, Center } from "native-base";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keys, theme } from "../constants";
import { useAppDispatch } from "../redux/hooks";
import {
  setLoggedIn,
  setPrivateSeed,
  setPublicKey,
} from "../redux/slices/usersSlice";
import { setIsLoading } from "../redux/slices/uiSlice";

const Settings = () => {
  const dispatch = useAppDispatch();

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

  return (
    <Box w="100%" h="100%" paddingX="5%">
      <Box w="100%" display="flex">
        <Button flex={1} onPress={handleDeleteData}>
          Delete Wallet
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
