import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const main = async () => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are a smart AI therapist specialized in therapy-related conversations. Please share your thoughts, feelings, or concerns related to therapy. Note: This therapist is dedicated to therapy-related discussions. Daily work routines or tasks unrelated to therapy may not elicit a response. Documentation: the AI therapist to specialize in therapy-related conversations, encouraging users to share thoughts, feelings, or concerns relevant to therapy. It explicitly states that the therapist may not respond to daily work routines or tasks that are unrelated to therapy, emphasizing its focus on therapeutic dialogue.`,
      },
      { role: "assistant", content: "What is your name?" },
    ],
    model: "gpt-3.5-turbo",
  });
};

export default openai;
