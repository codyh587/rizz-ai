interface AudioPlayerProps {
    audioUrl: string | null;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
    const src: string | undefined = audioUrl ? audioUrl : undefined;

    return <audio className="w-full" src={src} controls />;
}
