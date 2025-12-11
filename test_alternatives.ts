import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error('API Key not found');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
    'gemini-2.0-flash-exp',
    'gemini-flash-lite-latest',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash-lite-preview-02-05'
];

async function testModels() {
    console.log('Testing alternative models...');

    for (const modelName of modelsToTest) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Hello');
            const response = result.response.text();
            console.log('✅ SUCCESS');
            console.log(`   Response: ${response.substring(0, 20)}...`);
            // We found a working one, but let's test all to see which is best (or just stop at first)
            // Actually, let's stop at first success to be quick.
            return;
        } catch (error: any) {
            console.log('❌ FAILED');
            if (error.message.includes('429')) {
                console.log('   Reason: Quota exceeded');
            } else {
                console.log(`   Reason: ${error.message.substring(0, 50)}...`);
            }
        }
    }
    console.log('\nAll alternatives failed.');
}

testModels();
