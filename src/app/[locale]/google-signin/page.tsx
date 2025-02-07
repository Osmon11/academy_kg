"use client";

import {
  signIn,
  useSession,
} from "next-auth/react";
import { useEffect } from "react";

import { Box } from "@mui/material";

import { TubeSpinner } from "@/shared/UI";

const SignInPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === "loading") && !session)
      void signIn("google");
    if (status === "authenticated" && session)
      window.close();
  }, [session, status]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    >
      <Box
        className="tube_spinner_wrapper"
        sx={{ height: "100%" }}
      >
        <TubeSpinner
          width={50}
          height={50}
        />
      </Box>
    </Box>
  );
};

export default SignInPage;
