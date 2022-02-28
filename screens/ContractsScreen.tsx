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
import { useAppDispatch } from "../redux/hooks";
import { setLoggedIn } from "../redux/slices/usersSlice";

const ContractsScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <Center bg="coolGray.900" h="100%" w="100%">
      Contracts
    </Center>
  );
};

export default ContractsScreen;
