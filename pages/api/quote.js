export const config = {
  maxDuration: 30,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { category } = req.body;
  if (!category) return res.status(400).json({ error: 'Category is required' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    return res.status(500).json({ error: 'API key not configured' });
  }

  console.log('Calling Gemini API for category:', category);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a short Telugu quote about "${category}". Reply with ONLY a JSON object like this, nothing else: {"telugu": "quote in Telugu script", "english": "English translation"}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 1,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    console.log('Gemini response status:', response.status);
    const responseText = await response.text();
    console.log('Gemini raw response:', responseText);

    if (!response.ok) {
      console.error('Gemini API error:', responseText);
      return res.status(502).json({ error: `Gemini error: ${response.status}`, details: responseText });
    }

    const data = JSON.parse(responseText);
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('Extracted text:', text);

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error('No JSON in response:', text);
      return res.status(500).json({ error: 'Bad response format', raw: text });
    }

    const parsed = JSON.parse(match[0]);
    return res.status(200).json({
      telugu: parsed.telugu || '',
      english: parsed.english || '',
    });

  } catch (err) {
    console.error('Handler error:', err.message);
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
}
