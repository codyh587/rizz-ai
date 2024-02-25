interface AudioPlayerProps {
    audioUrl: string;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
    return audioUrl && <audio src={audioUrl} controls></audio>;
}
