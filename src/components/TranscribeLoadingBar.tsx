import { Transcriber } from '@/hooks/useTranscriber';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TranscribeLoadingBarProps {
    transcriber: Transcriber;
}

export function TranscribeLoadingBar({
    transcriber,
}: TranscribeLoadingBarProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const currentItemProgress =
            transcriber.progressItems.reduce((accumulator, item) => {
                return accumulator + item.progress;
            }, 0) / transcriber.progressItems.length;

        if (currentItemProgress > progress) {
            setProgress(currentItemProgress);
        }
    }, [transcriber.progressItems]);

    return (
        <>
            <div className="flex justify-center gap-3">
                <Label>Downloading models {}...</Label>
                <Loader2 className="h-3 w-3 animate-spin mt-0.5" />
            </div>
            <Progress value={progress} />
        </>
    );
}
