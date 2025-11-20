import { GoogleGenAI, Type } from "@google/genai";
import { AISuggestion } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAppSuggestions = async (appName: string, url: string): Promise<AISuggestion> => {
  try {
    const prompt = `
      Analyze the app idea for "${appName}" (URL: ${url}).
      Act as a mobile app product manager.
      Provide a catchy marketing tagline (max 10 words), a professional short description (max 40 words) suitable for an App Store, and a primary theme color (hex code) that matches the vibe of such an application.
      Ensure the color is a valid 6-digit hex code.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tagline: { type: Type.STRING },
            description: { type: Type.STRING },
            primaryColor: { type: Type.STRING, description: "A hex color code, e.g., #FF5733" }
          },
          required: ["tagline", "description", "primaryColor"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as AISuggestion;
  } catch (error) {
    console.error("Gemini AI generation failed:", error);
    // Fallback if AI fails
    return {
      tagline: "Your content, now native.",
      description: "Experience the best of the web in a native environment. Seamless, fast, and responsive.",
      primaryColor: "#3b82f6"
    };
  }
};
