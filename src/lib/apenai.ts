import OpenAI from "openai"

// openai setup
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.OPENAI_API_KEY,
})

export default openai;