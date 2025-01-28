import { Suspense } from "react";

import { SearchCoursesPage } from "@/appPages/SearchCoursesPage";

export default function Search() {
  return (
    <Suspense>
      <SearchCoursesPage />
    </Suspense>
  );
}
