import { CourseOverviewPage } from "@/appPages/Accaunt";

interface ICourseParams {
  course: string;
}

export default async function Course({
  params,
}: {
  params: Promise<ICourseParams>;
}) {
  console.log((await params).course);
  return <CourseOverviewPage />;
}
