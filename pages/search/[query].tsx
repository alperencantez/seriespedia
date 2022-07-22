import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/Header";
import useSWR from "swr";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import NoResult from "../../components/NoResult";
import { Search2Icon } from "@chakra-ui/icons";

const fetcher = (...args: any) =>
  fetch(...([args] as const)).then((res) => res.json());

const Query = () => {
  const router = useRouter();
  const { query } = router.query;

  const { data, error } = useSWR(
    `https://api.tvmaze.com/search/shows?q=${query}`,
    fetcher
  );

  if (!data) {
    return (
      <div>
        <Box textAlign='center' py={200} px={6} backdropBlur={0.8}>
          <Spinner size='xl' /> <Heading>Loading...</Heading>
        </Box>
      </div>
    );
  } else if (data.length > 0) {
    return (
      <div>
        <Head>
          <title>Results for "{query}" | series-pedia</title>
        </Head>
        <Header />
        <div className='container'>
          <div className='row'>
            <Heading className='my-5' color='gray.800'>
              <Search2Icon color='gray.400' /> Showing results for "{query}"
            </Heading>
            {Array.from({ length: data.length }, (_, i) => {
              const IMAGE = data[i].show.image
                ? data[i].show.image.original
                : "https://www.invenura.com/wp-content/themes/consultix/images/no-image-found-360x250.png";

              return (
                <Link
                  href={{
                    pathname: "/shows/[detail]",
                    query: { detail: data[i].show.id },
                  }}
                  key={i}
                >
                  <div className='col-4'>
                    <Center py={12} role={"button"}>
                      <Box
                        role={"group"}
                        p={6}
                        maxW={"330px"}
                        w={"full"}
                        bg={"white"}
                        boxShadow={"2xl"}
                        rounded={"lg"}
                        pos={"relative"}
                        zIndex={1}
                      >
                        <Box
                          rounded={"lg"}
                          mt={-12}
                          pos={"relative"}
                          height={"400px"}
                          _after={{
                            transition: "all .3s ease",
                            content: '""',
                            w: "full",
                            h: "full",
                            pos: "absolute",
                            top: 5,
                            left: 0,
                            backgroundImage: `url(${IMAGE})`,
                            filter: "blur(15px)",
                            zIndex: -1,
                          }}
                          _groupHover={{
                            _after: {
                              filter: "blur(20px)",
                            },
                          }}
                        >
                          <Image
                            rounded={"lg"}
                            height={400}
                            width={282}
                            objectFit={"cover"}
                            src={IMAGE}
                          />
                        </Box>
                        <Stack pt={10} align={"center"}>
                          <Text
                            color={"gray.500"}
                            fontSize={"sm"}
                            textTransform={"uppercase"}
                          >
                            {Object.values(data[i].show.genres).join(", ")}
                          </Text>
                          <Heading
                            fontSize={"2xl"}
                            fontFamily={"body"}
                            fontWeight={500}
                          >
                            {data[i].show.name}
                          </Heading>
                          <Stack direction={"row"} align={"center"}>
                            <Text fontWeight={800} fontSize={"xl"}>
                              Rating:
                            </Text>
                            <Text fontSize={"xl"} color={"gray.600"}>
                              {data[i].show.rating.average} / 10
                            </Text>
                          </Stack>
                        </Stack>
                      </Box>
                    </Center>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else if (data.length == 0 || error) {
    return (
      <div>
        <Head>
          <title>Oopsie, doopsie!</title>
        </Head>
        <Header />
        <NoResult />
      </div>
    );
  }
};

export default Query;
