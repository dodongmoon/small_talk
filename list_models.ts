import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error('API Key not found in environment variables');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // Note: The Node.js SDK might not expose listModels directly on genAI instance in all versions,
        // but usually it's under the ModelManager or similar. 
        // However, for simplicity with the current SDK version, we might need to use the REST API 
        // or check if the SDK supports it. 
        // Let's try a direct REST call if SDK usage is ambiguous, but let's try SDK first if possible.
        // Actually, looking at SDK docs, usually it's not straightforward to list models via the main entry point in some versions.
        // Let's use a simple fetch to the API endpoint to be sure.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log('Available Models:');
            data.models.forEach((model: any) => {
                console.log(`- ${model.name} (${model.displayName})`);
                console.log(`  Supported methods: ${model.supportedGenerationMethods}`);
            });
        } else {
            console.log('No models found or error:', data);
        }
    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
