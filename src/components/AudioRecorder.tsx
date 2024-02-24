import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface AudioRecorderProps {
    mimeType: string;
}

enum RecordingState {
    Recording,
    Inactive,
    Paused,
}

export function AudioRecorder({ mimeType }: AudioRecorderProps) {
    const [permission, setPermission] = useState<boolean>(false);

    const mediaRecorder: useRef<HTMLElement> = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState<RecordingState>(
        RecordingState.Inactive
    );

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audio, setAudio] = useState<string | null>(null);

    async function getMicrophonePermission() {
        if ('MediaRecorder' in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert((err as Error).message);
            }
        } else {
            alert('The MediaRecorder API is not supported in your browser.');
        }
    }

    async function startRecording() {
        setRecordingStatus(RecordingState.Recording);
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream!, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();

        const localAudioChunks: Blob[] = [];

        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };

        setAudioChunks(localAudioChunks);
    }

    function stopRecording() {
        setRecordingStatus(RecordingState.Inactive);
        //stops the recording instance
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    }

    return (
        <div className="flex flex-col gap-5">
            {!permission && (
                <Button onClick={getMicrophonePermission}>
                    Get permission
                </Button>
            )}

            {permission &&
                [RecordingState.Inactive, RecordingState.Paused].includes(
                    recordingStatus
                ) && <Button onClick={startRecording}>Start recording</Button>}

            {permission && recordingStatus === RecordingState.Recording && (
                <Button onClick={stopRecording}>Stop recording</Button>
            )}

            {audio && (
                <div className="flex flex-col items-center">
                    <audio src={audio} controls></audio>
                </div>
            )}
        </div>
    );
}
