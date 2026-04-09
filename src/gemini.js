let apiKey = 'AIzaSyCBamKvTYs8kciZCk85HSc3q54KPCJARtM';
// name = 'Gemini API Key';
// project_name = 'projects/152664644800';
// project_number = '152664644800';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8129,
  responseMimeType: 'text/plain',
};

async function run(prompt) {
  const chatSession = model.startChart({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
}

export default run();
