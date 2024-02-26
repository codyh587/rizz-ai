import { Textarea } from '@/components/ui/textarea';

interface TranscribeOutputProps {
    loading: boolean;
    text: string | undefined;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export function TranscribeOutput({
    loading,
    text,
    onChange,
}: TranscribeOutputProps) {
    return (
        <Textarea
            onChange={onChange}
            disabled={loading}
            placeholder={loading ? 'Working...' : undefined}
            defaultValue={text}
        />
    );
}
