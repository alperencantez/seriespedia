import type { NextPage } from "next";
import DetailedView from "../components/DetailedView";
import Header from "../components/Header";

const Home: NextPage = ({ dataShow, dataEp }: any) => {
  return (
    <>
      <Header />
      <DetailedView
        data={dataShow}
        dataEpisode={dataEp}
        tabName={"seriespedia"}
      />
    </>
  );
};

export async function getServerSideProps() {
  // show a random show every time user refreshes the page
  const random: Number = Math.floor(Math.random() * 500);

  const show = await fetch(`https://api.tvmaze.com/shows/${random}`);
  const ep = await fetch(`https://api.tvmaze.com/shows/${random}/episodes`);

  const dataShow = await show.json();
  const dataEp = await ep.json();

  return { props: { dataShow, dataEp } };
}

export default Home;
