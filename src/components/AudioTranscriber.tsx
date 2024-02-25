import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Transcriber } from '@/hooks/useTranscriber';

interface AudioTranscriberProps {
    audioBuffer: AudioBuffer | null;
    transcriber: Transcriber;
}

export function AudioTranscriber({
    audioBuffer,
    transcriber,
}: AudioTranscriberProps) {
    return (
        <>
            {transcriber.isBusy || transcriber.isModelLoading || audioBuffer === null ? (
                <Button disabled>Transcribe</Button>
            ) : (
                <Button onClick={() => transcriber.start(audioBuffer)}>Transcribe</Button>
            )}
            {transcriber.output && <Textarea defaultValue={transcriber.output.text} />}
        </>
    );
}
