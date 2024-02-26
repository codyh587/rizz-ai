import { Textarea } from '@/components/ui/textarea';
import { Transcriber } from '@/hooks/useTranscriber';

interface TranscribeOutputProps {
    transcriber: Transcriber;
}

export function TranscribeOutput({ transcriber }: TranscribeOutputProps) {
    return (
        <Textarea
            defaultValue={
                transcriber.output ? transcriber.output.text : undefined
            }
        />
    );
}
