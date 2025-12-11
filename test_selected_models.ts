import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const apiKey = process.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    console.error('API Key not found');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const MODELS_TO_TEST = [
    'gemini-flash-latest',
    'gemini-flash-lite-latest',
    'gemini-2.5-flash-lite-preview-09-2025'
];

async function testModels() {
    console.log('Testing configured fallback models...\n');

    for (const modelName of MODELS_TO_TEST) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Hello, are you working?');
            const response = result.response.text();
            console.log(`✅ SUCCESS`);
            console.log(`   Response: ${response.trim().substring(0, 50)}...`);
        } catch (error: any) {
            let msg = error.message.split('\n')[0];
            if (msg.includes('429')) msg = '429 Quota Exceeded';
            if (msg.includes('404')) msg = '404 Not Found';
            console.log(`❌ FAILED: ${msg}`);
        }
        console.log('---');
    }
}

testModels();
