import classNames from "classnames";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import Link from "next/link";

import {
  IconButton,
  Paper,
  PaperProps,
  Typography,
} from "@mui/material";

import { routePath } from "@/shared/functions";

import arrowLeftBlackIcon from "@/icons/arrow-left-black.svg";
import logoPrimaryIcon from "@/icons/logo-primary.svg";

import styles from "./styles.module.scss";

interface IPaperContainerProps
  extends PaperProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

export default function PaperContainer({
  className,
  title,
  children,
  ...props
}: IPaperContainerProps) {
  const router = useRouter();
  function handleGoBack() {
    router.back();
  }
  return (
    <Paper
      className={classNames(
        styles.paper,
        className,
      )}
      {...props}
    >
      <IconButton
        className={styles.go_back_button}
        onClick={handleGoBack}
      >
        <Image
          src={arrowLeftBlackIcon}
          alt="arrow left black icon"
          width={24}
          height={24}
        />
      </IconButton>
      <Link href={routePath("main")}>
        <Image
          src={logoPrimaryIcon}
          alt="islamic online-academy green icon"
          width={100}
          height={100}
        />
      </Link>
      <Typography
        variant="h5"
        textAlign="center"
        color="textThirtiary"
        fontWeight={600}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
