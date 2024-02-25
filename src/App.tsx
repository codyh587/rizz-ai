import { AudioPlayer } from './components/AudioPlayer';
import { AudioRecorder } from './components/AudioRecorder';
import { AudioTranscriber } from './components/AudioTranscriber';
import { useRecord } from './hooks/useRecord';
import { useTranscribe } from './hooks/useTranscribe';

const mimeType = 'audio/webm';

export default function App() {
    const {
        recordingStatus,
        permission,
        audioUrl,
        getMicrophonePermission,
        startRecording,
        stopRecording,
        invalidateData,
    } = useRecord();

    const { transcribeStatus, transcribeData, transcribe, invalidateData } =
        useTranscribe(audioUrl);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col gap-5">
                <AudioRecorder mimeType={mimeType} onRecorded={setAudioUrl} />
                <AudioPlayer audioUrl={audioUrl} />
                <AudioTranscriber audioUrl={audioUrl} />
            </div>
        </div>
    );
}
