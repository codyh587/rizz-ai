import { Button } from '@/components/ui/button';

interface AudioTranscriberProps {
    audioUrl: string;
}

export function AudioTranscriber({ audioUrl }) {

    return <Button onClick={fetchAudioTranscript}>Transcribe</Button>;
}
