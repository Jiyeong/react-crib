'use client'
import { useState } from "react";

export default function WeatherChat() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  const askWeather = async () => {
    const res = await fetch(`/api/weather?question=${encodeURIComponent(input)}`);
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
      <div className="p-4 space-y-2">
        <input
            className="border p-2 w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="예: 서울 날씨 알려줘"
        />
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={askWeather}
        >
          물어보기
        </button>
        {answer && <div className="mt-2 p-2 bg-gray-100">{answer}</div>}
      </div>
  );
}
