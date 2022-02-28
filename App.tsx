import React, { useEffect } from "react";
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
import NativeBaseIcon from "./components/NativeBaseIcon";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { theme } from "./constants";
import nacl from "tweetnacl";

export default function App() {
  useEffect(() => {
    const seed = nacl.randomBytes(32); // Important
    const keyPair = nacl.sign.keyPair.fromSeed(seed);
    const seedHex = Buffer.from(seed).toString("hex");
    const privateHex = Buffer.from(keyPair.secretKey).toString("hex");
    const publicHex = Buffer.from(keyPair.publicKey).toString("hex"); // Important
    console.log(seedHex);
    console.log(privateHex);
    console.log(publicHex);
  }, []);

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
