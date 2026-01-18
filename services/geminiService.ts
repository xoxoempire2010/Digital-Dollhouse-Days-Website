import { GoogleGenAI } from "@google/genai";

// Initialize AI Client
// Note: In a real deployment, ensure process.env.API_KEY is available.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateCreativePrompt = async (theme: string): Promise<string> => {
  if (!apiKey) {
    return "API Key missing. Imagine a beautiful sunset instead!";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a creative muse for a nostalgic, girly, scrapbook-themed website. 
      Generate a short, whimsical, and inspiring creative writing prompt or scrapbooking idea based on the theme: "${theme}". 
      Keep it under 30 words. Use emojis. Tone: Soft, dreamy, encouraging.`,
    });
    
    return response.text || "Create something beautiful today! ✨";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The muse is sleeping... try again later! 🌙";
  }
};