export const config = {
  runtime: 'edge',
};

export default async function handler(req) {

  const { message } = await req.json();

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: message }
        ],
        stream: true
      })
    }
  );

  return new Response(response.body);

}