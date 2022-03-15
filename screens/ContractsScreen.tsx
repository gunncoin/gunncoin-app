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
  VStack,
  ScrollView,
  Input,
} from "native-base";
import { icons } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch } from "../redux/hooks";
import { setLoggedIn } from "../redux/slices/usersSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const ContractsScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <Box marginX="5%">
        <ScrollView w="100%">
          <Text fontSize="2xl" alignSelf="center">
            Contracts
          </Text>
          <Input placeholder="Search Contracts" marginTop={2} />
          <Divider marginY={5} />
          <Box w="100%">
            <Text alignSelf={"flex-start"}>Active Contracts</Text>
            <VStack space={3} marginTop={1}>
              <Button w="100%" h="50px" rounded="lg">
                Contract Name
              </Button>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
            </VStack>
          </Box>
          <Divider marginY={5} />
          <Box w="100%">
            <Text alignSelf={"flex-start"}>Popular Contracts</Text>
            <VStack space={3} marginTop={1}>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
              <Box w="100%" h="50px" bg="gray.800" rounded="lg"></Box>
            </VStack>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default ContractsScreen;
