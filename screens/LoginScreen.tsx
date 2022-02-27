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
} from "native-base";
import { icons } from "../constants";
import { FontAwesome } from "@expo/vector-icons";

const LoginPage = () => {
  return (
    <Center bg="coolGray.900" h="100%" w="100%">
      <Center paddingX="5%" w="100%">
        <Center bg="gray.800" rounded="lg" w="80%" paddingY="15px">
          <Text fontSize="xl" bold>
            Welcome to Gunncoin!
          </Text>
          <Box h="20px" />
          <Button rounded="sm">Create Wallet</Button>
        </Center>
      </Center>
    </Center>
  );
};

export default LoginPage;
