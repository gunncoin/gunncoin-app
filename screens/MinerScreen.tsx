import React, { useState } from "react";
import { Box, Text, Button } from "native-base";

const MinerScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const handleOpenQRScanner = () => {};

  return (
    <Box>
      <Box rounded={"lg"} bg="gray.800">
        Miner
        <Box>
          <Button onPress={handleOpenQRScanner}>Open QR Code scanner</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MinerScreen;
