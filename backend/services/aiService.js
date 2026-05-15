import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
});

export async function generateScript(topic) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "你是专业短视频脚本AI"
      },
      {
        role: "user",
        content: `生成一个60秒爆款短视频文案：${topic}`
      }
    ]
  });

  return completion.choices[0].message.content;
}