import React, { useEffect } from "react";
import { Platform } from "react-native";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
} from "native-base";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import Navigation from "./navigation";
import store from "./redux/store";
import { keys, theme } from "./constants";
import { useAppDispatch } from "./redux/hooks";
import {
  setLoggedIn,
  setPrivateSeed,
  setPublicKey,
} from "./redux/slices/usersSlice";
import { setIsLoading } from "./redux/slices/uiSlice";
import useStartupChecks from "./hooks/useStartupChecks";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <Navigation />
          <StatusBar />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
