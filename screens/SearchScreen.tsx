import React from "react";
import { Box, Divider, Input, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  return (
    <SafeAreaView>
      <Box marginX="5%">
        <Text fontSize="2xl" alignSelf={"center"}>
          Search
        </Text>

        <Input marginTop={2} placeholder="Search User Wallet" />
        <VStack space={3} marginTop={3}>
          <Box bg="gray.800" w="100%" h="40px" rounded="lg" />
          <Box bg="gray.800" w="100%" h="40px" rounded="lg" />
          <Box bg="gray.800" w="100%" h="40px" rounded="lg" />
          <Box bg="gray.800" w="100%" h="40px" rounded="lg" />
          <Box bg="gray.800" w="100%" h="40px" rounded="lg" />
          <Box bg="gray.800" w="100%" h="40px" rounded="lg" />
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default SearchScreen;
