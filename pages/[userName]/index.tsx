import React, { useEffect, useState } from "react";
import { Box, Heading, Spinner, Button } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0";
import Header from "../../components/Header";
import Head from "next/head";

const Index = () => {
  type updatedWatchlist = {
    email: string;
    watchlist: Array<string>;
  };

  const { user } = useUser();

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);

  const dbPath: any = process.env.NEXT_PUBLIC_DB_PATH;

  async function fetchFromDB() {
    setisLoading(true);
    await fetch(dbPath)
      .then((res) => res.json())
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
    setisLoading(false);
  }

  useEffect(() => {
    fetchFromDB();
  }, []);

  if (isLoading) {
    return (
      <Box textAlign='center' py='200' px={6} backdropBlur={0.8}>
        <Spinner size='xl' />{" "}
        <Heading>Loading... This might take a while</Heading>
      </Box>
    );
  }

  return (
    <div>
      <Head>
        <title>Watchlist of {user?.nickname} | seriespedia</title>
      </Head>
      <Header />
      <div className='container'>
        <table className='table table-hover mt-4 w-75 mx-auto'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: data?.length }, (_, i): any => {
              if (data[i].email == user?.email) {
                return data[i].watchlist.map((show: string) => (
                  <tr
                    key={data[i].watchlist.indexOf(show)}
                    className='tableBodyRow'
                  >
                    <td>{show}</td>
                    <td>
                      <Button
                        colorScheme='red'
                        size='sm'
                        variant='ghost'
                        onClick={() => {
                          // updating the UI
                          let table: any = document.querySelector("tbody");
                          data[i].watchlist.filter(async (item: string) => {
                            if (
                              data[i].watchlist.indexOf(item) ==
                              data[i].watchlist.indexOf(show)
                            ) {
                              table?.deleteRow(data[i].watchlist.indexOf(show));
                              data[i].watchlist.splice(
                                data[i].watchlist.indexOf(show),
                                1
                              );
                              const email: string = data[i].email;
                              const newWatchlist: Array<string> =
                                data[i].watchlist;

                              const updatedWatchlist: updatedWatchlist = {
                                email: email,
                                watchlist: newWatchlist,
                              };

                              // updating the database
                              await fetch(dbPath, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  data: updatedWatchlist,
                                }),
                              }).catch((e) => console.log(e));
                            }
                          });
                        }}
                      >
                        Remove from watchlist
                      </Button>
                    </td>
                  </tr>
                ));
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
