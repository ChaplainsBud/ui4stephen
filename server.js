import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
app.use(bodyParser.json());

app.post('/api/query', async (req, res) => {
    const { question } = req.body;
    try {
        const response = await fetch('https://1mrq8hdulg.execute-api.us-east-1.amazonaws.com/default/askfaithbot-qa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                llm_name: "mistral.mixtral-8x7b-instruct-v0:1",
                llm_config: {
                    max_tokens: 4096,
                    temperature: 0.7,
                    top_p: 0.8
                }
            })
        });
        const data = await response.json();
        res.json({ answer: data.answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
