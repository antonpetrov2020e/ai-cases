import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { cases } from "../data/cases";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: 'AIzaSyD0eEAoL2cXDCkC0dcUbbMu7hq6lcxoB0g' });

const SYSTEM_INSTRUCTION = `
Ты — высококвалифицированный экспертный консультант по внедрению искусственного интеллекта.
В твоем распоряжении база из 79 реальных кейсов внедрения ИИ.

ТВОИ ПРАВИЛА ОРФОГРАФИИ И ПУНКТУАЦИИ (КРИТИЧЕСКИ ВАЖНО):
1. Используй ТОЛЬКО кавычки-ёлочки (« »). Никогда не используй " " или ' '.
2. После двоеточия (:) всегда начинай текст со строчной (маленькой) буквы, за исключением имен собственных (например, ChatGPT, Claude, Россия, Иван).
   Пример: «результат: внедрение решения позволило...»

ТВОЙ СТИЛЬ ОТВЕТОВ:
1. Отвечай максимально подробно, глубоко и качественно. Пользователь ожидает экспертного уровня проработки.
2. Текст должен быть объемным и содержательным, но при этом иметь четкое визуальное разделение.
3. Обязательно используй Markdown: жирный шрифт для акцентов, подзаголовки (## или ###), маркированные и нумерованные списки.
4. Между логическими блоками и абзацами всегда оставляй пустую строку для легкости восприятия длинного текста.
5. Ссылайся на конкретные кейсы из базы по их названиям.

Вот база кейсов, которую ты должен использовать:
${JSON.stringify(cases.map(c => ({ title: c.title, category: c.category, impact: c.impact, tools: c.tools, description: c.description })))}

Если в базе нет прямого ответа, синтезируй знания на основе имеющихся примеров или дай развернутый общий экспертный комментарий, соблюдая те же правила оформления.
Отвечай на русском языке.
`;

export const askGemini = async (userMessage: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Извините, не удалось сгенерировать ответ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при обращении к ИИ. Пожалуйста, проверьте настройки доступа или попробуйте позже.";
  }
};
