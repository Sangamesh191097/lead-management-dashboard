import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateFollowupMessage = async (
  lead: {
    name: string;
    company: string;
    status: string;
    notes?: string;
  }
) => {
  const prompt = `
Generate a professional personalized sales follow-up message.

Lead Details:
Name: ${lead.name}
Company: ${lead.company}
Status: ${lead.status}
Notes: ${lead.notes || "No notes"}

Requirements:
- professional tone
- concise
- personalized
- suitable for email or WhatsApp
- no markdown
`;

  const response =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

  return response.choices[0].message.content;
};