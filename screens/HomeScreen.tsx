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
  ScrollView,
} from "native-base";
import { icons } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, RootTabScreenProps } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchBalance,
  fetchTransactions,
  selectBalance,
  selectBalanceLoading,
  selectTransactions,
  selectTransactionsLoading,
} from "../redux/slices/usersSlice";
import { convertToUSD } from "../api";
import { RefreshControl } from "react-native";
import TransactionButton from "../components/Home/TransactionButton";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const balance = useAppSelector(selectBalance);
  const transactions = useAppSelector(selectTransactions);
  const balanceLoading = useAppSelector(selectBalanceLoading);
  const transactionsLoading = useAppSelector(selectTransactionsLoading);

  const onRefresh = () => {
    dispatch(fetchBalance());
    dispatch(fetchTransactions());
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        h="100%"
      >
        <Center>
          <Box paddingX="5" w="100%">
            <Box rounded="lg" w="100%" marginTop="10%">
              <Text fontSize="4xl">{`$${convertToUSD(balance).toFixed(
                2
              )}`}</Text>
              <Text fontSize="md" color="gray.400" marginTop={"-1"}>
                {balanceLoading ? "LOADING" : `${balance} GUNN`}
              </Text>
              <HStack space={3} display="flex" marginTop={4}>
                <Button
                  leftIcon={
                    <Icon as={FontAwesome} name="arrow-up" size={"5"} />
                  }
                  flex={1}
                  colorScheme="primary"
                  onPress={() => navigation.navigate("SendInitial")}
                >
                  Send
                </Button>
                <Button
                  leftIcon={
                    <Icon as={FontAwesome} name="arrow-down" size={5} />
                  }
                  flex={1}
                  onPress={() => navigation.navigate("Recieve")}
                >
                  Recieve
                </Button>
              </HStack>
            </Box>
            <Divider marginY={5} />
            <Box
              w="100%"
              h="250"
              paddingX="3"
              paddingBottom="5"
              paddingTop="3"
              display="flex"
            >
              <Text fontSize="xl">GUNN Price</Text>
              <Box bg="gray.800" w="100%" flex={1} rounded="lg" marginTop={2}>
                <Center h="100%">
                  <Text>Not ready yet, come back later...</Text>
                </Center>
              </Box>
              <HStack space={3} display="flex" marginTop={3}>
                <Button flex={1} colorScheme="secondary" isDisabled>
                  Buy
                </Button>
                <Button flex={1} colorScheme="secondary" isDisabled>
                  Sell
                </Button>
              </HStack>
            </Box>
            <Divider marginY={5} />
            <Box>
              <HStack justifyContent={"space-between"}>
                <Text fontSize={"2xl"}>Transactions</Text>
                <Icon as={FontAwesome} name="search" size={5} />
              </HStack>
              <VStack space={3} marginTop={1}>
                {!transactionsLoading &&
                  transactions.map((tx) => (
                    <TransactionButton
                      amount={tx.amount}
                      sender={tx.sender}
                      reciever={tx.receiver}
                    />
                  ))}
                {transactionsLoading &&
                  [1, 2, 3, 4].map(() => (
                    <Box bg="gray.800" rounded="lg" w="100%" h="75px"></Box>
                  ))}
              </VStack>
            </Box>
          </Box>
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
