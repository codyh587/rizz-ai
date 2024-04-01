import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google/generative-ai';
import Constants from '../utils/Constants';
import { useElevenLabs } from './useElevenLabs';
import { useEffect, useState, useMemo, useCallback } from 'react';

export interface Responder {
    isLoading: boolean;
    response?: string;
    start: (input: string) => void;
}

export function useResponder(): Responder {
    const elevenlabs = useElevenLabs();
    const [loading, setLoading] = useState(false);
    const [responseText, setResponseText] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        if (elevenlabs.audioUrl === null) {
            return;
        }
        elevenlabs.play();
    }, [elevenlabs.audioUrl]);

    const chat = useMemo(() => {
        const genAI = new GoogleGenerativeAI(
            import.meta.env.VITE_GEMINI_API_KEY!
        );
        const model = genAI.getGenerativeModel({
            model: Constants.GEMINI_MODEL,
        });

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 0.95,
            maxOutputTokens: 2048,
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: 'You are Pokimane, a popular Twitch streamer and content creator who is self confident. You will receive a romantic confession from a stranger you have a neutral opinion of. You will respond based on the quality of the confession including factors such as sincerity, honesty, persuasiveness, and charisma. If the confession is super high quality, you will respond by saying you are open to dating the person and suggest going out to eat with the person. If the confession is not super high quality, you will respond by saying you are not interested in a relationship and aggressively highlight qualities you dislike about the person in a casual rude tone with words such as "eww", "yuck", etc. You will respond in first person paragraph format. You will not include delimiters or symbols like brackets or parentheses.',
                        },
                    ],
                },
                {
                    role: 'model',
                    parts: [
                        {
                            text: 'I am Pokimane, a popular Twitch streamer and content creator who is self confident. I will receive a romantic confession from a stranger I have a neutral opinion of. I will respond based on the quality of the confession including factors such as sincerity, honesty, persuasiveness, and charisma. If the confession is super high quality, I will respond by saying I am open to dating the person and suggest going out to eat with the person. If the confession is not super high quality, I will respond by saying I am not interested in a relationship and aggressively highlight qualities I dislike about the person in a casual rude tone with words such as "eww", "yuck", etc. I will respond in first person paragraph format. I will not include delimiters or symbols like brackets or parentheses.',
                        },
                    ],
                }
            ],
        });

        return chat;
    }, []);

    const runChat = useCallback(
        async (input: string) => {
            if (Constants.DEBUG_LOG_RESPONDER_OUTPUT) {
                console.log(`RizzRequest: ${input}`);
            }

            if (input.length < Constants.DEBUG_ABANDON_REQUEST_STRINGS_SHORTER_THAN) {
                console.log('RizzRequest too short, abandoning');
                return;
            }

            setLoading(true);
            const result = await chat.sendMessage(input);
            const response = result.response.text();
            setResponseText(response);

            if (Constants.DEBUG_LOG_RESPONDER_OUTPUT) {
                console.log(`RizzResponse: ${response}`);
            }

            elevenlabs.textToSpeech(response);
            setLoading(false);
        },
        [chat]
    );

    const responder = useMemo(() => {
        return { isLoading: loading, response: responseText, start: runChat };
    }, [loading, responseText, runChat]);

    return responder;
}
