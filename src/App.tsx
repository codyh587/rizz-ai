import { AudioPlayer } from './components/AudioPlayer';
import { AudioRecorder } from './components/AudioRecorder';
import { AudioTranscriber } from './components/AudioTranscriber';
import { useRecord, MimeType } from './hooks/useRecord';
import { useTranscriber } from './hooks/useTranscriber';

const mimeType = MimeType.Wav;

export default function App() {
    const { recordStatus, permission, audioUrl, audioBuffer, ...recordUtils } =
        useRecord(mimeType);

    const transcriber = useTranscriber();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col gap-5">
                <AudioRecorder
                    recordStatus={recordStatus}
                    permission={permission}
                    onPermission={recordUtils.getMicrophonePermission}
                    onRecord={recordUtils.startRecord}
                    onStop={recordUtils.stopRecord}
                />
                <AudioPlayer audioUrl={audioUrl} />
                <AudioTranscriber
                    audioBuffer={audioBuffer}
                    transcriber={transcriber}
                />
            </div>
        </div>
    );
}
