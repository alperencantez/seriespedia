import React, { useEffect, useState } from "react";
import DetailedView from "../../components/DetailedView";
import { NextRouter, useRouter } from "next/router";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import Header from "../../components/Header";

type Props = {
  id: number;
  router: NextRouter;
  data: any;
  episodes: any;
  props: any;
  detail: string;
};

const Id = () => {
  const router: NextRouter = useRouter();
  const query: any = router.query;
  const detail: any = query.detail;

  const [data, setData] = useState<any>(null);
  const [dataEpisode, setdataEpisode] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://api.tvmaze.com/shows/${detail}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });

    fetch(`https://api.tvmaze.com/shows/${detail}/episodes`)
      .then((res) => res.json())
      .then((dataEpisode) => {
        setdataEpisode(dataEpisode);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading)
    return (
      <Box textAlign="center" py={200} px={6} backdropBlur={0.8}>
        <Spinner size="xl" /> <Heading>Loading...</Heading>
      </Box>
    );
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <Header />
      <DetailedView
        data={data}
        dataEpisode={dataEpisode}
        tabName={data.name + " | seriespedia "}
      />
    </div>
  );
};

// to prevent an error when a refresh occurs
export async function getServerSideProps(props: Props) {
  const res = await fetch(`https://api.tvmaze.com/shows/${props.detail}`);
  const ep = await fetch(
    `https://api.tvmaze.com/shows/${props.detail}/episodes`
  );

  const data = await res.json();
  const dataEpisode = await ep.json();

  return { props: { data, dataEpisode } };
}

export default Id;
