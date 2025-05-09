"use client";

import classNames from "classnames";
import { EmblaOptionsType } from "embla-carousel";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Box,
  IconButton,
  SxProps,
} from "@mui/material";

import arrowRightIcon from "@/icons/arrow-right.svg";

import styles from "./Carousel.module.scss";

interface ICarouselProps {
  options?: EmblaOptionsType;
  children: React.ReactNode;
  navButtons?: boolean;
  dotButtons?: boolean;
  dotButtonType?: "dot" | "line";
  dotButtonsSx?: SxProps;
}

export function Carousel({
  options,
  children,
  navButtons,
  dotButtons = true,
  dotButtonType = "dot",
  dotButtonsSx,
}: ICarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      ...options,
    },
    [Autoplay()],
  );
  const [prevBtnDisabled, setPrevBtnDisabled] =
    useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] =
    useState(true);
  const [activeIndex, setActiveIndex] =
    useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<
    number[]
  >([]);

  const onNavButtonClick = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const autoplay =
        emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction ===
        false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
    },
    [],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      onNavButtonClick(emblaApi);
    }
  }, [emblaApi, onNavButtonClick]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      onNavButtonClick(emblaApi);
    }
  }, [emblaApi, onNavButtonClick]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      onNavButtonClick(emblaApi);
    },
    [emblaApi, onNavButtonClick],
  );

  const onInit = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList());
    },
    [],
  );

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setPrevBtnDisabled(
        !emblaApi.canScrollPrev(),
      );
      setNextBtnDisabled(
        !emblaApi.canScrollNext(),
      );
      setActiveIndex(
        emblaApi.selectedScrollSnap(),
      );
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi
      .on("reInit", onInit)
      .on("reInit", onSelect)
      .on("select", onSelect);
  }, [emblaApi, onSelect, onInit]);

  const arrawRightIcon = (
    <Image
      src={arrowRightIcon}
      alt="arrow right icon"
      width={24}
      height={24}
    />
  );
  return (
    <Box className={classNames(styles.embla)}>
      <Box
        className={styles.embla__viewport}
        ref={emblaRef}
      >
        <Box className={styles.embla__container}>
          {children}
        </Box>
      </Box>
      {navButtons &&
        (!prevBtnDisabled ||
          !nextBtnDisabled) && (
          <Fragment>
            <IconButton
              className={classNames(
                styles.buttons,
                styles.prev_button,
              )}
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
            >
              {arrawRightIcon}
            </IconButton>
            <IconButton
              className={classNames(
                styles.buttons,
                styles.next_button,
              )}
              onClick={scrollNext}
              disabled={nextBtnDisabled}
            >
              {arrawRightIcon}
            </IconButton>
          </Fragment>
        )}
      {dotButtons && scrollSnaps.length > 1 && (
        <Box
          className={classNames(
            styles.dot_buttons,
            styles[dotButtonType],
          )}
          sx={dotButtonsSx}
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={classNames({
                [styles.active]:
                  index === activeIndex,
              })}
              onClick={() =>
                onDotButtonClick(index)
              }
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
