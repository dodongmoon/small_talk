import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error('API Key not found');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testProModel() {
    console.log('Testing gemini-pro...');
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent('Hello, are you working?');
        const response = result.response.text();
        console.log('✅ SUCCESS: gemini-pro is working!');
        console.log(`   Response: ${response.substring(0, 50)}...`);
    } catch (error: any) {
        console.log('❌ FAILED: gemini-pro is NOT working.');
        if (error.message.includes('429')) {
            console.log('   Reason: Quota exceeded');
        } else if (error.message.includes('404')) {
            console.log('   Reason: Model not found');
        } else {
            console.log(`   Reason: ${error.message.substring(0, 100)}...`);
        }
    }
}

testProModel();
