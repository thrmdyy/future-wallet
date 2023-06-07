import axios from 'axios';

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/completions';

export const sendMessageToFuty = async (messages: any) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                prompt: messages,
                model: 'davinci:ft-personal-2023-06-06-20-42-09',
                max_tokens: 512,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            },
        );

        console.log(response.data.choices[0].text);

        return response.data.choices[0].text;
    } catch (error) {
        // Handle any errors here
        console.error(error);
    }
};
