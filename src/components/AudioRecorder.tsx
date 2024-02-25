
import { Button } from '@/components/ui/button';


export function AudioRecorder({ permission, recordingStatus }) {

    return (
        <>
            {!permission && (
                <Button onClick={getMicrophonePermission}>
                    Get permission
                </Button>
            )}

            {permission &&
                [RecordingState.Inactive, RecordingState.Paused].includes(
                    recordingStatus
                ) && <Button onClick={startRecording}>Start recording</Button>}

            {permission && recordingStatus === RecordingState.Recording && (
                <Button onClick={stopRecording}>Stop recording</Button>
            )}
        </>
    );
}
