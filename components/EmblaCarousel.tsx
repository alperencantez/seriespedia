import React, { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  options?: any;
  slides: ReactNode[];
};

export const EmblaCarousel = (props: PropType) => {
  const { slides } = props;
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <div className="row" ref={emblaRef}>
      <div className="d-flex">
        {slides.map((slide, index) => (
          <div className="embla__slide mb-3 col-10" key={index}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};
