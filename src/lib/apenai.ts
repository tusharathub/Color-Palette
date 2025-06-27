import OpenAI from "openai"

// openai setup
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export default openai;