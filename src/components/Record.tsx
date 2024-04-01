import { useState, useEffect, useCallback, ReactNode } from 'react';
import { useRecorder, RecordStatus } from '../hooks/useRecorder';
import { useTranscriber } from '../hooks/useTranscriber';
import { useResponder } from '../hooks/useResponder';

let messageSent: boolean = false;

function RecordIcon() {
    return (
        <svg
            width="54"
            height="54"
            viewBox="0 0 352 512"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" />
        </svg>
    );
}

function StopIcon() {
    return (
        <svg
            width="54"
            height="54"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
        >
            <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
        </svg>
    );
}

function LoadingIcon() {
    return (
        <div className="animate-spin inline-block size-12 border-[4px] border-current border-t-transparent text-white rounded-full dark:text-white" />
    );
}

interface BigRedButtonProps {
    onClick: () => void;
    children: ReactNode;
}

function BigRedButton({ onClick, children }: BigRedButtonProps) {
    return (
        <button
            className="flex relative justify-center items-center w-32 h-32 rounded-full shadow-md border border-white/10 bg-rose-500  hover:border-white/40 hover:bg-rose-500/80"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function Record() {
    const recorder = useRecorder();
    const transcriber = useTranscriber();
    const responder = useResponder();
    const [seconds, setSeconds] = useState<number>(0);
    const [progress, setProgress] = useState(0);

    // Transcriber updates
    useEffect(() => {
        transcriber.start(recorder.audioBuffer!);
    }, [recorder.audioBuffer]);

    useEffect(() => {
        if (transcriber.output && !transcriber.isBusy) {
            responder.start(transcriber.output?.text);
        }
    }, [transcriber.output, transcriber.isBusy]);

    // Recording timer
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (recorder.recordStatus === RecordStatus.Recording) {
            setSeconds(0);
            interval = setInterval(() => setSeconds((s) => s + 1), 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [recorder.recordStatus]);

    // Download progress counter
    useEffect(() => {
        const currentItemProgress =
            transcriber.progressItems.reduce((accumulator, item) => {
                return accumulator + item.progress;
            }, 0) / transcriber.progressItems.length;

        if (currentItemProgress > progress) {
            setProgress(Math.round(currentItemProgress));
        }
    }, [transcriber.progressItems]);

    const getTimeElapsed = useCallback((seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        let ret = '';
        if (hrs > 0) {
            ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
        }
        ret += '' + mins + ':' + (secs < 10 ? '0' : '');
        ret += '' + secs;
        return ret;
    }, []);

    let clickAction;
    let subtitleText;
    let Icon;

    if (!recorder.permission) {
        // Initial
        clickAction = recorder.getMicrophonePermission;
        subtitleText = 'Click to request microphone permission';
        Icon = RecordIcon;
    } else if (transcriber.isModelLoading) {
        // Downloading models
        clickAction = () => {};
        subtitleText = `Downloading Whisper models... (${progress}%)`;
        Icon = LoadingIcon;
    } else if (transcriber.isBusy) {
        // Transcriber working
        clickAction = () => {};
        subtitleText = 'Transcribing message...';
        Icon = LoadingIcon;
    } else if (recorder.recordStatus === RecordStatus.Inactive) {
        // Not recording
        clickAction = recorder.startRecord;
        subtitleText = messageSent
            ? 'Message sent! Response will arrive shortly'
            : 'Click to start recording';
        Icon = RecordIcon;
    } else {
        // Recording
        clickAction = () => {
            recorder.stopRecord();
            messageSent = true;
        };
        subtitleText = `Recording ${getTimeElapsed(seconds)}`;
        Icon = StopIcon;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <BigRedButton onClick={clickAction}>
                    <Icon />
                </BigRedButton>
                <p className="mt-10 font-medium">{subtitleText}</p>
            </div>
        </>
    );
}
