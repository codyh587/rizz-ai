import { useState } from 'react';
import { pipeline } from '@xenova/transformers';

export enum TranscribeStatus {
    Error,
    Inactive,
    Loading,
}

export interface TranscribeData {
    text: string;
}

export interface useTranscribeProps {
    audioUrl: string | null;
}

export function useTranscribe({ audioUrl }) {
    const [transcribeStatus, setTranscribeState] = useState<TranscribeStatus>(
        TranscribeStatus.Inactive
    );
    const [transcribeData, setTranscribeData] = useState<TranscribeData | null>(
        null
    );

    const transcribe = async () => {
        if (audioUrl === null) {
            return;
        }

        try {
            const transcriber = await pipeline(
                'automatic-speech-recognition',
                'Xenova/whisper-tiny.en'
            );
            const output = await transcriber(audioUrl);
            setTranscribeData(output);
        } catch (err) {
            console.error((err as Error).message);
            setTranscribeState(TranscribeStatus.Error);
        }
    };

    const invalidateData = () => {
        setTranscribeState(TranscribeStatus.Inactive);
        setTranscribeData(null);
    };

    return [transcribeStatus, transcribeData, transcribe, invalidateData];
}
