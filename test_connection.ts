import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error('API Key not found');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.0-flash-exp',
    'gemini-flash-latest',
    'gemini-1.5-flash-8b', // sometimes available
    'gemini-pro'
];

async function testModels() {
    console.log('Testing models with provided API Key...');

    for (const modelName of modelsToTest) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Hello');
            const response = result.response.text();
            console.log('✅ SUCCESS');
            console.log(`   Response: ${response.substring(0, 20)}...`);
            return; // Stop after finding the first working model
        } catch (error: any) {
            console.log('❌ FAILED');
            if (error.message.includes('404')) {
                console.log('   Reason: Model not found');
            } else if (error.message.includes('429')) {
                console.log('   Reason: Quota exceeded / Limit 0');
            } else {
                console.log(`   Reason: ${error.message.substring(0, 50)}...`);
            }
        }
    }
    console.log('\nAll models failed. Please check your API key project settings.');
}

testModels();
