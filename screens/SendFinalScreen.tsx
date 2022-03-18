import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Center,
  Text,
  IconButton,
  VStack,
  Icon,
  ScrollView,
} from "native-base";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type SendFinalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SendFinal"
>;

const SendFinalScreen = ({ route }: SendFinalScreenProps) => {
  const { amount } = route.params;

  return (
    <Box marginX="5%" h="100%">
      {amount}
    </Box>
  );
};

export default SendFinalScreen;
