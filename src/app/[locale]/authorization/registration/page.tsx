import { Suspense } from "react";

import { RegistrationPage } from "@/appPages/Authorization";

export default function SignUp() {
  return (
    <Suspense>
      <RegistrationPage />
    </Suspense>
  );
}
