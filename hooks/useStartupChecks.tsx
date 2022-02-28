import React, { useEffect } from "react";
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

export const useStartupChecks = async () => {
  const dispatch = useAppDispatch();

  // Check for private/public keys
  if (Platform.OS == "ios" || Platform.OS == "android") {
    const privateSeed = await SecureStore.getItemAsync(keys.PRIVATE_SEED);
    const publicKey = await SecureStore.getItemAsync(keys.PUBLIC_KEY);

    if (privateSeed != null && publicKey != null) {
      dispatch(setLoggedIn(true));
      dispatch(setPrivateSeed(privateSeed));
      dispatch(setPublicKey(publicKey));
    }
  } else {
    const privateSeed = await AsyncStorage.getItem(keys.PRIVATE_SEED);
    const publicKey = await AsyncStorage.getItem(keys.PUBLIC_KEY);

    if (privateSeed != null && publicKey != null) {
      dispatch(setLoggedIn(true));
      dispatch(setPrivateSeed(privateSeed));
      dispatch(setPublicKey(publicKey));
    }
  }

  dispatch(setIsLoading(false));
};

export default useStartupChecks;
