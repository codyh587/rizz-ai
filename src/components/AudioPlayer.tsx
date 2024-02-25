interface AudioPlayerProps {
    audioUrl: string | null;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
    const src: string | undefined = audioUrl ? audioUrl : undefined;

    return (
        <audio
            className={'bg-transparent' + (audioUrl ? '' : '')}
            src={src}
            controls
        />
    );
}
