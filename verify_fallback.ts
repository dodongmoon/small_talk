import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

// Mock the getModel function to simulate failures
const FALLBACK_MODELS = [
    'gemini-flash-latest',
    'gemini-flash-lite-latest',
    'gemini-2.5-flash-lite-preview-09-2025'
];

async function simulateFallback() {
    console.log('Starting Fallback Simulation...\n');

    for (const modelName of FALLBACK_MODELS) {
        console.log(`[Attempt] Trying model: ${modelName}`);

        try {
            // Simulate failure for the first two models
            if (modelName === 'gemini-flash-latest') {
                throw new Error('[429] Quota exceeded for gemini-flash-latest');
            }
            if (modelName === 'gemini-flash-lite-latest') {
                throw new Error('[429] Quota exceeded for gemini-flash-lite-latest');
            }

            // Simulate success for the third model
            console.log(`✅ SUCCESS with ${modelName}!`);
            console.log('   (Simulation: API call would happen here)');
            return; // Stop after success

        } catch (error: any) {
            console.warn(`⚠️ Failed with ${modelName}: ${error.message}`);
            console.log('   -> Switching to next fallback...\n');
        }
    }

    console.error('❌ All models failed.');
}

simulateFallback();
