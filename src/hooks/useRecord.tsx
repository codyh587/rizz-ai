import { useState, useRef } from 'react';

export enum RecordStatus {
    Inactive,
    Paused,
    Recording,
}

export enum MimeType {
    Webm = 'audio/webm',
    Mp4 = 'audio/mp4',
    Ogg = 'audio/ogg',
    Wav = 'audio/wav',
    Aac = 'audio/aac',
}

export interface useRecordProps {
    mimeType: MimeType
}

export function useRecord({ mimeType }: useRecordProps) {
    const [permission, setPermission] = useState<boolean>(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [recordingStatus, setRecordingStatus] = useState<RecordStatus>(
        RecordStatus.Inactive
    );
    const mediaRecorder: useRef<MediaRecorder | null> = useRef(null);

    const getMicrophonePermission = async () => {
        if ('MediaRecorder' in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                console.error((err as Error).message);
            }
        } else {
            alert('The MediaRecorder API is not supported in your browser.');
        }
    };

    const startRecording = async () => {
        setRecordingStatus(RecordStatus.Recording);
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
    };

    const stopRecording = async () => {
        setRecordingStatus(RecordStatus.Inactive);
        //stops the recording instance
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            setAudioChunks([]);
        };
    };

    const invalidateData = () => {
        setRecordingStatus(RecordStatus.Inactive);
        setAudioUrl(null);
    };

    return {
        recordingStatus,
        permission,
        audioUrl,
        getMicrophonePermission,
        startRecording,
        stopRecording,
        invalidateData
    };
}
