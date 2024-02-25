import { useCallback, useState, useRef } from 'react';
import Constants from '../utils/Constants';

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

export function useRecord(mimeType: MimeType) {
    const [permission, setPermission] = useState<boolean>(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [recordStatus, setRecordStatus] = useState<RecordStatus>(
        RecordStatus.Inactive
    );
    const mediaRecorder: useRef<MediaRecorder | null> = useRef(null);

    function handleSetBuffer(data: Blob) {
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
            const audioCTX = new AudioContext({
                sampleRate: Constants.SAMPLING_RATE,
            });
            const arrayBuffer = fileReader.result as ArrayBuffer;
            const decoded = await audioCTX.decodeAudioData(arrayBuffer);
            setAudioBuffer(decoded);
        };
        fileReader.readAsArrayBuffer(data);
    }

    const getMicrophonePermission = useCallback(async () => {
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
    }, []);

    const startRecord = useCallback(async () => {
        setRecordStatus(RecordStatus.Recording);
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
    }, [mimeType, stream]);

    const stopRecord = useCallback(async () => {
        setRecordStatus(RecordStatus.Inactive);
        //stops the recording instance
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            handleSetBuffer(audioBlob);
            setAudioChunks([]);
        };
    }, [audioChunks, mimeType]);

    const invalidateData = useCallback(() => {
        setRecordStatus(RecordStatus.Inactive);
        setAudioBuffer(null);
        setAudioUrl(null);
    }, []);

    return {
        recordStatus,
        permission,
        audioUrl,
        audioBuffer,
        getMicrophonePermission,
        startRecord,
        stopRecord,
        invalidateData,
    };
}
