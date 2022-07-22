import React from "react";
import Image from "next/image";

type Props = {
  epPoster: string;
  epDes: any;
  epName: string;
  epInfo: string;
  epSeason: string;
};

const ShowSlider = (props: Props) => {
  return (
    <div role={"button"} id="showSlider">
      <div className="container">
        <div className="col-12">
          <Image
            src={props.epPoster}
            alt="poster"
            width="620"
            height="340"
            style={{ borderRadius: "5px" }}
          />
          <h3 className="mt-3 h3 fw-bold">{props.epName}</h3>
          <p className="text-muted my-2">
            {props.epSeason + " " + props.epInfo}
          </p>
          <span className="text-muted"></span>
          <span className="text-muted">{props.epDes}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowSlider;
