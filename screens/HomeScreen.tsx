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

const HomePage = () => {
  return (
    <Center>
      <Box paddingX="5%" w="100%">
        <Box rounded="lg" w="100%" marginTop="30%">
          <Center>
            <Text fontSize="md">Current Wallet Balance</Text>
            <Text fontSize="5xl">$3,293.46</Text>
            <HStack marginTop="15px" space={3}>
              <Button
                leftIcon={<Icon as={FontAwesome} name="send" />}
                size="lg"
              >
                Send
              </Button>
              <Button
                leftIcon={<Icon as={FontAwesome} name="dollar" />}
                size="lg"
              >
                Recieve
              </Button>
            </HStack>
          </Center>
        </Box>
        <Center></Center>
      </Box>
    </Center>
  );
};

export default HomePage;
