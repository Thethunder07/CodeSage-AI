import { GoogleGenAI } from "@google/genai";

export const reviewCodeWithAI = async (language, code) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are a senior software engineer.

Analyze the following ${language} code.

Return ONLY valid JSON.

{
  "summary": "",
  "score": 0,
  "bugs": [
    {
      "title": "",
      "severity": "",
      "line": 0,
      "description": ""
    }
  ],
  "suggestions": [],
  "timeComplexity": "",
  "spaceComplexity": ""
}

Code:
${code}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let text = response.text;

  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(text);
};