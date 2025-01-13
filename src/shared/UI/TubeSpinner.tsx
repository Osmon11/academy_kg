import Image from "next/image";

import tubeSpinnerPrimaryIcon from "@/icons/tube-spinner-primary.svg";

interface ITubeSpinnerSpinner {
  width: number;
  height: number;
}

export function TubeSpinner({
  width,
  height,
}: ITubeSpinnerSpinner) {
  return (
    <Image
      src={tubeSpinnerPrimaryIcon}
      alt="tube spinner green icon"
      width={width}
      height={height}
    />
  );
}
