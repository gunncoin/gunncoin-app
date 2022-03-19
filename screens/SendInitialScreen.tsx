import React, { useState, useRef, useEffect } from "react";
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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type SendInitialScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SendInitial"
>;

const SendScreen = ({ navigation }: SendInitialScreenProps) => {
  const [amountStr, setAmountStr] = useState("0");
  const [decimalEnabled, setDecimalEnabled] = useState(true);
  const scrollRef = useRef<any>(null);

  const NumPadButton = ({
    val,
    onPress,
    isDisabled = false,
  }: {
    val: any;
    onPress: () => void;
    isDisabled?: boolean;
  }) => {
    return (
      <Button
        variant={"ghost"}
        flex={1}
        onPress={onPress}
        isDisabled={isDisabled}
      >
        {val}
      </Button>
    );
  };

  useEffect(() => {
    // Manage enable decimal
    setDecimalEnabled(!amountStr.includes("."));
  }, [amountStr]);

  const handleNumPressed = (val: number | string) => {
    if (val == "." && amountStr.includes(".")) return;

    console.log("TODO: Haptics");
    let newStr = `${amountStr}${val}`;
    if (newStr[0] == "0" && newStr[1] != ".") newStr = newStr.substring(1);
    if (newStr[0] == ".") newStr = newStr.substring(1);
    setAmountStr(newStr);
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const deleteLastNum = () => {
    if (amountStr.length <= 1) setAmountStr("0");
    else setAmountStr(amountStr.substring(0, amountStr.length - 1));
  };

  const handleNextPress = () => {
    navigation.navigate("SendFinal", { amount: parseFloat(amountStr) });
  };

  return (
    <Box marginX="5%" h="100%">
      <Center marginTop="3" h="30%">
        <Text fontSize="xl">GUNN</Text>
        <ScrollView horizontal centerContent ref={scrollRef}>
          <Text
            fontSize="6xl"
            adjustsFontSizeToFit
            numberOfLines={1}
            alignSelf="center"
          >
            {amountStr}
          </Text>
        </ScrollView>
      </Center>
      <Flex h="50%" w="100%">
        <HStack w="100%" flex={1}>
          {[1, 2, 3].map((val) => {
            return (
              <NumPadButton val={val} onPress={() => handleNumPressed(val)} />
            );
          })}
        </HStack>
        <HStack w="100%" flex={1}>
          {[4, 5, 6].map((val) => {
            return (
              <NumPadButton val={val} onPress={() => handleNumPressed(val)} />
            );
          })}
        </HStack>
        <HStack w="100%" flex={1}>
          {[7, 8, 9].map((val) => {
            return (
              <NumPadButton val={val} onPress={() => handleNumPressed(val)} />
            );
          })}
        </HStack>
        <HStack w="100%" flex={1}>
          <NumPadButton
            val={"."}
            onPress={() => handleNumPressed(".")}
            isDisabled={!decimalEnabled}
          />
          <NumPadButton val={"0"} onPress={() => handleNumPressed(0)} />
          <NumPadButton
            val={<Icon as={Feather} name="delete" color={"primary.500"} />}
            onPress={deleteLastNum}
          />
        </HStack>
      </Flex>
      <Flex flexDirection="row">
        <Button
          flex={1}
          onPress={handleNextPress}
          isDisabled={parseFloat(amountStr) == 0}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default SendScreen;
