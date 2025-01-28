import { ExamPage } from "@/appPages/Exam";

interface IExamProps {
  params: Promise<{
    course: string;
    exam: string;
    level: string;
  }>;
}

export default async function Exam({
  params,
}: IExamProps) {
  const { course, exam, level } = await params;
  return (
    <ExamPage
      courseId={course}
      examId={exam}
      levelId={level}
    />
  );
}
