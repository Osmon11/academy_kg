import { CourseOverviewPage } from "@/appPages/Accaunt";

interface ICourseProps {
  params: Promise<{
    course: string;
  }>;
}

export default async function Course({
  params,
}: ICourseProps) {
  const { course } = await params;
  return <CourseOverviewPage courseId={course} />;
}
