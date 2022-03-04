import React, { useEffect } from "react";
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
  Flex,
  Spacer,
  VStack,
} from "native-base";
import { icons } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, RootTabScreenProps } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
  return (
    <SafeAreaView>
      <Center>
        <Box paddingX="5" w="100%">
          <Box rounded="lg" w="100%" marginTop="10%">
            <Text fontSize="4xl">$3,293.46</Text>
            <Text fontSize="md" color="gray.400" marginTop={"-1"}>
              500 GUNN
            </Text>
            <HStack space={3} display="flex" marginTop={4}>
              <Button
                leftIcon={<Icon as={FontAwesome} name="arrow-up" size={"5"} />}
                flex={1}
                rounded="lg"
                colorScheme="primary"
              >
                Send
              </Button>
              <Button
                leftIcon={<Icon as={FontAwesome} name="arrow-down" size={5} />}
                flex={1}
                rounded="lg"
              >
                Recieve
              </Button>
            </HStack>
          </Box>
          <Divider marginY={5} />
          <Box
            bg="primary.800"
            w="100%"
            h="250"
            paddingX="3"
            paddingBottom="5"
            paddingTop="3"
            display="flex"
          >
            <Text fontSize="xl">GUNN Price</Text>
            <Box bg="primary.500" w="100%" flex={1} rounded="lg" marginTop={1}>
              <Center>
                <Text>TODO</Text>
              </Center>
            </Box>
            <HStack space={3} display="flex" marginTop="2">
              <Button flex={1}>Buy</Button>
              <Button flex={1}>Sell</Button>
            </HStack>
          </Box>
          <Divider marginY={5} />
          <Box>
            <Flex
              justifyContent={"space-between"}
              direction="row"
              align="center"
            >
              <Text fontSize={"2xl"}>Transactions</Text>
              <Icon as={FontAwesome} name="search" size={5} />
            </Flex>
            <VStack space={3}>
              <Box bg="primary.800" width="100%" height="50" rounded="lg"></Box>
              <Box bg="primary.800" width="100%" height="50" rounded="lg"></Box>
              <Box bg="primary.800" width="100%" height="50" rounded="lg"></Box>
              <Box bg="primary.800" width="100%" height="50" rounded="lg"></Box>
            </VStack>
          </Box>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default HomePage;
