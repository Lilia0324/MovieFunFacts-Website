import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function getMovieFact(title: string) {
  const prompt = `Give one concise, surprising, verifiable fun fact (1–2 sentences) about the movie "${title}". Avoid spoilers.`;

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9
    });
    return res.choices[0]?.message?.content?.trim() || "No fact available right now.";
  } catch (e) {
    console.error(e);
    return "Could not fetch a fun fact right now.";
  }
}
