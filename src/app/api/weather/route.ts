import { NextResponse, type NextRequest } from "next/server";
import { mastra } from "@/mastra";

// WeatherChat 컴포넌트가 호출하는 날씨 에이전트 API (OPENAI_API_KEY 필요)
export async function GET(req: NextRequest) {
  const question = req.nextUrl.searchParams.get("question");
  if (!question) {
    return NextResponse.json({ error: "question 파라미터가 필요합니다." }, { status: 400 });
  }

  const result = await mastra.getAgent("weatherAgent").generate(question);
  return NextResponse.json({ answer: result.text });
}
