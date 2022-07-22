import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

const NoResult = () => {
  return (
    <Box textAlign="center" py={200} px={6}>
      <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Ooops! No matching query.
      </Heading>
      <Text color={"gray.500"}>
        There can be a typo behind this! Or we might not have that show...
      </Text>
    </Box>
  );
};

export default NoResult;
