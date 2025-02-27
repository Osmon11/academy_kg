import classNames from "classnames";
import Image from "next/image";

import {
  IconButton,
  Paper,
  PaperProps,
  Typography,
} from "@mui/material";

import { useAppRouter } from "@/shared/hooks/useAppRouter";

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
  const router = useAppRouter();
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
      <IconButton
        onClick={() => router.push("main")}
      >
        <Image
          src={logoPrimaryIcon}
          alt="islamic online-academy green icon"
          width={100}
          height={100}
        />
      </IconButton>
      <Typography
        variant="h5"
        textAlign="center"
        color="textTertiary"
        fontWeight={600}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
