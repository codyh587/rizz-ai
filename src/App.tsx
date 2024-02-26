import { AudioPlayer } from './components/AudioPlayer';
import { AudioRecorder } from './components/AudioRecorder';
import { AudioTranscriber } from './components/AudioTranscriber';
import { TranscribeOutput } from './components/TranscribeOutput';
import { TranscribeLoadingBar } from './components/TranscribeLoadingBar';
import { useRecorder, MimeType } from './hooks/useRecorder';
import { useTranscriber } from './hooks/useTranscriber';
import { useMemo } from 'react';

export default function App() {
    const mimeType = useMemo(() => MimeType.Wav, []);
    const recorder = useRecorder(mimeType);
    const transcriber = useTranscriber();

    console.log(transcriber.isModelLoading, transcriber.progressItems)

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col gap-5">
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
                <TranscribeLoadingBar transcriber={transcriber} />
                <TranscribeOutput transcriber={transcriber} />
            </div>
        </div>
    );
}
