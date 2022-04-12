import { Box, Button, Center, Flex, HStack, Text, VStack } from "native-base";
import React, { useState } from "react";
import { convertToUSD } from "../../api";
import { useAppSelector } from "../../redux/hooks";
import { selectPublicKey } from "../../redux/slices/usersSlice";

type TransactionButtonProps = {
  amount: number;
  sender: string;
  reciever: string;
};

const TransactionButton = ({
  amount,
  sender,
  reciever,
}: TransactionButtonProps) => {
  const [isPositive, _] = useState(reciever == useAppSelector(selectPublicKey));

  const handleClick = () => {};

  const handleAddressHold = () => {
    // TODO: copy address
  };

  return (
    <Box
      bg="gray.800"
      rounded="lg"
      w="100%"
      justifyContent="space-around"
      padding="2"
    >
      <HStack justifyContent="space-between">
        <Box w="60%" h="100%">
          <Box rounded="lg" bg="gray.500" padding="1" margin="1">
            <Text isTruncated>{`From: ${isPositive ? sender : "You"}`}</Text>
          </Box>
          <Box rounded="lg" bg="gray.500" padding="1" margin="1">
            <Text isTruncated>{`To: ${isPositive ? "You" : reciever}`}</Text>
          </Box>
        </Box>
        <Box alignItems="flex-end" justifyContent="center">
          <Text fontSize="lg">
            {!isPositive && "-"}
            {amount} GUNN
          </Text>
          <Text fontSize="md" color={isPositive ? "green.500" : "red.500"}>
            {!isPositive && "-"}${convertToUSD(amount)}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default TransactionButton;
