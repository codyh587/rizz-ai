import { Button } from '@/components/ui/button';
import { RecordStatus } from '../hooks/useRecorder';

interface AudioRecorderProps {
    recordStatus: RecordStatus;
    permission: boolean;
    onPermission: () => void;
    onRecord: () => void;
    onStop: () => void;
}

export function AudioRecorder({
    recordStatus,
    permission,
    onPermission,
    onRecord,
    onStop,
}: AudioRecorderProps) {
    const recording: boolean = recordStatus === RecordStatus.Recording;

    return (
        <>
            {!permission ? (
                <Button onClick={onPermission}>Get permission</Button>
            ) : (
                <Button onClick={!recording ? onRecord : onStop}>
                    {!recording ? 'Start' : 'Stop'} recording
                </Button>
            )}
        </>
    );
}
