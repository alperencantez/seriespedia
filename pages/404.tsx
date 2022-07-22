import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Header from "../components/Header";
import Link from "next/link";
import Head from "next/head";

const Custom404 = () => {
  return (
    <div>
      <Head>
        <title>Page not found | series-pedia</title>
      </Head>
      <Header />
      <Box textAlign="center" py={200} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
          bgGradient="linear(to-r, red.400, red.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="25px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you're looking for does not seem to exist
        </Text>

        <Link href={{ pathname: "/", query: "" }}>
          <Button
            colorScheme="red"
            bgGradient="linear(to-r, red.400, red.500, red.600)"
            color="white"
            variant="solid"
            size="lg"
          >
            Go to Home
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Custom404;
