import { Suspense } from "react";

import { LoginPage } from "@/appPages/Authorization";

export default function SignIn() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
