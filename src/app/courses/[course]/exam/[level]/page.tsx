import { ExamPage } from "@/appPages/Exam";

interface IExamProps {
  params: Promise<{
    course: string;
    level: string;
  }>;
}

export default async function Exam({
  params,
}: IExamProps) {
  const { course, level } = await params;
  return (
    <ExamPage
      courseId={course}
      levelId={level}
    />
  );
}
