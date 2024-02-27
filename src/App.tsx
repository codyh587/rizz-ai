import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { AudioRecorder } from './components/AudioRecorder';
import { AudioTranscriber } from './components/AudioTranscriber';
import { TranscribeOutput } from './components/TranscribeOutput';
import { TranscribeLoadingBar } from './components/TranscribeLoadingBar';
import { useRecorder, MimeType } from './hooks/useRecorder';
import { useTranscriber } from './hooks/useTranscriber';
import { useResponder } from './hooks/useResponder';

export default function App() {
    const recorder = useRecorder(MimeType.Wav);
    const transcriber = useTranscriber();
    const responder = useResponder();

    const [userMessage, setUserMessage] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        setUserMessage(transcriber.output?.text);
    }, [transcriber.output]);

    return (
        <div className="flex flex-col justify-center gap-5 w-5/12 mx-auto my-20">
            <AudioRecorder
                recordStatus={recorder.recordStatus}
                permission={recorder.permission}
                onPermission={recorder.getMicrophonePermission}
                onRecord={recorder.startRecord}
                onStop={recorder.stopRecord}
            />
            <AudioPlayer audioUrl={recorder.audioUrl} />
            <AudioTranscriber
                audioBuffer={recorder.audioBuffer}
                transcriber={transcriber}
            />
            {transcriber.isModelLoading && (
                <TranscribeLoadingBar transcriber={transcriber} />
            )}
            <TranscribeOutput
                loading={!transcriber.isModelLoading && transcriber.isBusy}
                text={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
            />
            <Button onClick={() => responder.start(userMessage!)}>
                Send to Pokimane
            </Button>
            <p>{responder.response}</p>
        </div>
    );
}
