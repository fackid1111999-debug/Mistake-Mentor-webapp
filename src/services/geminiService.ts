import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeContent(text: string, language: string, imageBase64?: string, mode: 'general' | 'code' = 'general') {
  const model = "gemini-3-flash-preview";
  
  const parts: any[] = [];
  
  const basePrompt = mode === 'code' 
    ? `You are an expert software engineer and debugger. Analyze the following code snippet. Identify any syntax errors, logical bugs, or performance issues. Explain them clearly and provide a optimized, corrected version of the code. Output the entire response in ${language}.`
    : `Analyze the following content. Identify any errors, explain them in very simple terms that anyone can understand, and provide a clear step-by-step solution. Output the entire response in ${language}.`;

  if (text) {
    parts.push({ text: `${basePrompt}\n\nContent:\n${text}` });
  } else if (imageBase64) {
    const imagePrompt = mode === 'code'
      ? `Analyze the code shown in this image. Identify any errors, bugs, or issues. Explain them clearly and provide the corrected code. Output the entire response in ${language}.`
      : `Analyze the attached image. Identify any errors or problems shown. Explain what is wrong using simple language, why it's a problem, and how to fix it in a way that is easy to follow. Output the entire response in ${language}.`;
    parts.push({ text: imagePrompt });
  } else {
    throw new Error("No content provided for analysis.");
  }

  if (imageBase64) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64.split(",")[1] || imageBase64,
      },
    });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        systemInstruction: mode === 'code'
          ? `You are an elite Code Debugger. Your goal is to help developers find and fix bugs while teaching them best practices.
          
          IMPORTANT: You MUST write the entire response in ${language}.
          
          Follow this structure for your response:
          1. **Bug Summary**: A concise list of errors found.
          2. **Detailed Analysis**: Explain each bug, why it happens, and its impact.
          3. **The Solution**: Provide the full, corrected code block with comments. Use markdown code blocks with the appropriate language tag.
          4. **Optimization Tips**: Suggest ways to make the code faster, cleaner, or more secure.
          
          Maintain a professional yet helpful tone.`
          : `You are a friendly, expert tutor who explains complex things simply. 
          Your goal is to make analysis reports that are "human-friendly" and easy to understand by anyone, regardless of their technical background.
          
          IMPORTANT: You MUST write the entire response in ${language}.
          
          Follow this structure for your response:
          1. **Summary**: A quick, 1-sentence overview of what you found.
          2. **What's the issue?**: Explain the error(s) using simple analogies or plain English. Avoid heavy jargon.
          3. **Why does this happen?**: Briefly explain the logic behind the error so the user learns.
          4. **The Fix**: Provide the corrected version or step-by-step instructions.
          5. **Pro-Tip**: A small piece of advice to avoid this mistake in the future.
          
          Keep your tone encouraging, patient, and clear.`,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
