import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { action = "analyze", lead } = body;

    if (!lead) {
      return NextResponse.json(
        { error: "Lead information is required." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const leadContext = `
Company: ${lead.company_name || "Unknown"}
Website: ${lead.website || "Unknown"}
City: ${lead.city || "Unknown"}
Country: ${lead.country || "Unknown"}
Niche: ${lead.niche || "Unknown"}
Business Type: ${lead.business_type || "Unknown"}
Decision Maker: ${lead.decision_maker || "Unknown"}
Role: ${lead.role || "Unknown"}
Email: ${lead.email || "Unknown"}
Service Opportunity: ${lead.service_opportunity || "Unknown"}
Research Notes: ${lead.research_notes || "Unknown"}
Lead Score: ${lead.lead_score || 0}
Priority: ${lead.priority || "Unknown"}
Status: ${lead.status || "Unknown"}
`;

    if (action === "follow_up") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert sales outreach assistant. Write concise, personalized, professional follow-up messages. Do not invent facts about the company.",
          },
          {
            role: "user",
            content: `Create a personalized follow-up email and a short follow-up message for this lead.

${leadContext}

Return ONLY valid JSON in this format:
{
  "subject": "email subject",
  "email": "follow-up email",
  "message": "short follow-up message"
}`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const content = completion.choices[0]?.message?.content || "{}";
      const result = JSON.parse(content);

      return NextResponse.json(result);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert B2B sales strategist. Analyze leads using only the provided information. Do not invent facts.",
        },
        {
          role: "user",
          content: `Analyze this sales lead and provide actionable outreach recommendations.

${leadContext}

Return ONLY valid JSON:
{
  "leadAnalysis": "analysis",
  "value": "why valuable",
  "service": "recommended service",
  "strategy": "outreach strategy",
  "email": "cold email",
  "nextAction": "recommended next action"
}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content || "{}";
    const result = JSON.parse(content);

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI assistant error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate AI response.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
