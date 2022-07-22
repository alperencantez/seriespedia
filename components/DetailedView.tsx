import React from "react";
import Head from "next/head";
import Image from "next/image";
import parse from "html-react-parser";
import { Button, Heading, Stack } from "@chakra-ui/react";
import ShowSlider from "./ShowSlider";
import { EmblaCarousel } from "./EmblaCarousel";
import { useUser } from "@auth0/nextjs-auth0";

// types
type Props = {
  data: any;
  dataEpisode: any;
  tabName: string;
};

type userData = {
  email: string;
  watchlist: Array<any>;
};

const DetailedView = (props: Props) => {
  const { user }: any = useUser();

  // Big red button handler
  const redirectToWebPage = (): any => {
    if (props.data.officialSite == null) {
      // "no site" is not a specific query, it'll return 404 page either way
      window.location.href = "results/no-site";
    } else {
      window.location.href = props.data.officialSite;
    }
  };

  let sendRequest: userData = {
    email: user?.name,
    watchlist: [props.data.name],
  };

  // the second outlined button handler
  async function addToWatchlist() {
    // it returns "undefined" value when you console.log the user variable while signed out
    if (user === undefined) {
      alert("You need to sign in first");
    } else {
      const dbPath: any = process.env.NEXT_PUBLIC_DB_PATH;

      await fetch(dbPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: sendRequest }),
      }).catch((e) => console.log(e));
    }
  }

  return (
    <div id='featuredShow' style={{ overflowX: "hidden" }}>
      <Head>
        <title>{props.tabName}</title>
      </Head>

      <div className='container d-flex py-5 justify-content-between'>
        <div className='show-text col-5 align-self-center'>
          <h1 className='text-start fw-bolder display-4 my-2'>
            {props.data.name}
          </h1>
          <div className='text-start my-3'>
            {parse(String(props.data.summary))}
          </div>
          <p className='text-muted fw-bolder'>
            Genres:{" "}
            {props.data.genres ? props.data.genres.join(", ") : "no-data"}{" "}
            <br />
            Rating:{" "}
            {props.data.rating
              ? props.data.rating.average + " / 10"
              : "no-data"}
          </p>

          <Stack direction='row' className='mt-3'>
            <Button
              colorScheme={"yellow"}
              size='lg'
              className='me-2'
              onClick={redirectToWebPage}
            >
              Go to website
            </Button>
            <Button
              colorScheme={"dark"}
              variant='outline'
              size={"lg"}
              onClick={addToWatchlist}
            >
              Save to watchlist
            </Button>
          </Stack>
        </div>

        <Image
          className='col-12 my-4'
          src={
            props.data.image
              ? props.data.image.original
              : "https://www.invenura.com/wp-content/themes/consultix/images/no-image-found-360x250.png"
          }
          alt='poster-main'
          width={420}
          height={570}
          priority={true}
          style={{
            borderRadius: "10px",
            boxShadow: "5px 5px 5px 5px #333",
          }}
        />
      </div>

      <div className='episodes container pt-5'>
        <div className='col-8'>
          <Heading className='my-4 ms-2'>Episodes</Heading>
          <EmblaCarousel
            slides={Array.from(
              { length: props.dataEpisode ? props.dataEpisode.length : 10 },
              (_, i) => {
                return [
                  <div key={i}>
                    <ShowSlider
                      epName={props.dataEpisode[i].name}
                      epPoster={
                        props.dataEpisode[i].image &&
                        props.dataEpisode[i].image.original !== null
                          ? props.dataEpisode[i].image.original
                          : "https://www.invenura.com/wp-content/themes/consultix/images/no-image-found-360x250.png"
                      }
                      epDes={
                        props.dataEpisode[i].summary !== null
                          ? parse(props.dataEpisode[i].summary)
                          : "no-data"
                      }
                      epSeason={
                        "Season: " + props.dataEpisode[i].season + " | "
                      }
                      epInfo={" Episode: " + props.dataEpisode[i].number}
                    />
                  </div>,
                ];
              }
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
