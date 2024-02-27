import Constants from '../utils/Constants';
import { useCallback, useMemo, useState } from 'react';

// SHORTEN AI RESPONSE TO SAVE ON ELEVENLABS CREDITS
const DEBUG_SHORTEN_AI_RESPONSE = true;
const DEBUG_SHORTEN_LENGTH_TO = 10;

export interface ElevenLabs {
    loading: boolean;
    audioUrl: string | null;
    textToSpeech: (input: string) => void;
    play: () => void;
}

export function useElevenLabs(): ElevenLabs {
    const [loading, setLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const textToSpeech = useCallback(async (input: string) => {
        if (DEBUG_SHORTEN_AI_RESPONSE) {
            if (DEBUG_SHORTEN_LENGTH_TO < 5) {
                return;
            }
            input = input.slice(0, DEBUG_SHORTEN_LENGTH_TO);
        }

        setLoading(true);

        const api_key = import.meta.env.VITE_ELEVENLABS_API_KEY!;
        const voice_id = Constants.ELEVENLABS_VOICE_ID;
        const model = Constants.ELEVENLABS_MODEL;

        const options = {
            method: 'POST',
            headers: {
                'xi-api-key': api_key,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model_id: model,
                text: input,
                voice_settings: { similarity_boost: 0.75, stability: 0.5 },
            }),
        };

        fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}?optimize_streaming_latency=2`,
            options
        )
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
            })
            .catch((err) => console.error(err));

        setLoading(false);
    }, []);

    const play = useCallback(() => {
        if (audioUrl === null) {
            return;
        }
        new Audio(audioUrl).play();
        setAudioUrl(null);
    }, [audioUrl]);

    const elevenlabs: ElevenLabs = useMemo(() => {
        return { loading, audioUrl, textToSpeech, play };
    }, [loading, audioUrl, textToSpeech, play]);

    return elevenlabs;
}
