import { Box, Center, Text } from "native-base";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { useAppSelector } from "../redux/hooks";
import { selectPublicKey } from "../redux/slices/usersSlice";

const RecieveScreen = () => {
  const publicKey = useAppSelector(selectPublicKey);

  return (
    <Box marginX={"5%"}>
      <Center>
        <Center bg="primary.500" rounded="lg" w="100%">
          <Text fontSize="3xl">Wallet Address:</Text>
          <Center margin="2" padding="1" rounded="lg" bg="gray.600">
            <Text fontSize="lg">{publicKey}</Text>
          </Center>
        </Center>
        <Center bg="blueGray.500" rounded="lg" w="100%" padding="3" marginY="4">
          <QRCode value={publicKey} size={200} />
        </Center>
      </Center>
    </Box>
  );
};

export default RecieveScreen;
