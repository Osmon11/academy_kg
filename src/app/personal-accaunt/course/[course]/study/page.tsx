import { StudyPage } from "@/appPages/Study";

interface IStudyProps {
  params: Promise<{
    course: string;
  }>;
}

export default async function Study({
  params,
}: IStudyProps) {
  const { course } = await params;
  return <StudyPage courseId={course} />;
}
