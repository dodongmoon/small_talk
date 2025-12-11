import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error('API Key not found');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
    'gemini-2.0-flash-lite-preview',
    'gemini-2.0-flash-lite-preview-02-05',
    'gemini-2.5-flash-lite-preview-09-2025',
    'gemini-1.5-flash-8b' // Adding this as another potential lightweight option
];

async function testPreviewModels() {
    console.log('Testing preview models...');

    for (const modelName of modelsToTest) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Hello');
            const response = result.response.text();
            console.log('✅ SUCCESS');
            console.log(`   Response: ${response.substring(0, 20)}...`);
        } catch (error: any) {
            console.log('❌ FAILED');
            if (error.message.includes('429')) {
                console.log('   Reason: Quota exceeded');
            } else if (error.message.includes('404')) {
                console.log('   Reason: Model not found');
            } else {
                console.log(`   Reason: ${error.message.substring(0, 50)}...`);
            }
        }
    }
}

testPreviewModels();
