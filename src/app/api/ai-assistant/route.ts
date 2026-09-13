import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "OPENAI_API_KEY is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    const {
      company_name,
      website,
      niche,
      city,
      country,
      lead_score,
      priority,
      status,
      service_opportunity,
      research_notes,
    } = body;

    const prompt = `
You are an expert B2B client hunting and sales assistant.

Analyze the following potential client and provide practical, personalized recommendations.

LEAD INFORMATION

Company Name: ${company_name || "Unknown"}
Website: ${website || "Not provided"}
Niche: ${niche || "Not provided"}
City: ${city || "Not provided"}
Country: ${country || "Not provided"}

Lead Score: ${lead_score || 0}
Priority: ${priority || "Low"}
Current Status: ${status || "New"}

Service Opportunity:
${service_opportunity || "Not provided"}

Research Notes:
${research_notes || "Not provided"}

Return ONLY valid JSON in this exact format:

{
  "leadAnalysis": "string",
  "value": "string",
  "service": "string",
  "strategy": "string",
  "email": "string",
  "nextAction": "string"
}

Instructions:

- Analyze the lead realistically.
- Do not invent specific facts about the company.
- Recommend a relevant service offer based on available information.
- Make the outreach strategy personalized.
- Write a short professional cold email.
- Give one clear next action.
`;

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      input: prompt,
    });

    const output = response.output_text;

    let analysis;

    try {
      analysis = JSON.parse(output);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "AI returned an invalid response format.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("AI Assistant Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze lead with AI.",
      },
      {
        status: 500,
      }
    );
  }
}
