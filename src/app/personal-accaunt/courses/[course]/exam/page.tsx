import { ExamPage } from "@/appPages/Accaunt";

interface IExamProps {
  params: Promise<{
    course: string;
  }>;
}

export default async function Exam({
  params,
}: IExamProps) {
  const { course } = await params;
  return <ExamPage courseId={course} />;
}
