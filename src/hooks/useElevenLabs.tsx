import Constants from '../utils/Constants';
import { useCallback, useMemo, useState } from 'react';

export interface ElevenLabs {
    audioUrl: string | null;
    textToSpeech: (input: string) => void;
    play: () => void;
}

export function useElevenLabs(): ElevenLabs {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const textToSpeech = useCallback(async (input: string) => {
        if (Constants.DEBUG_SHORTEN_ELEVENLABS_RESPONSE) {
            if (Constants.DEBUG_SHORTEN_ELEVENLABS_LENGTH_TO <= 0) {
                return;
            }
            input = input.slice(0, Constants.DEBUG_SHORTEN_ELEVENLABS_LENGTH_TO);
        }

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
            `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}?optimize_streaming_latency=1`,
            options
        )
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
            })
            .catch((err) => console.error(err));
    }, []);

    const play = useCallback(() => {
        new Audio(audioUrl!).play();
    }, [audioUrl]);

    const elevenlabs: ElevenLabs = useMemo(() => {
        return { audioUrl, textToSpeech, play };
    }, [audioUrl, textToSpeech, play]);

    return elevenlabs;
}
