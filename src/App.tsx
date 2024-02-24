import { AudioRecorder } from './components/AudioRecorder';

export default function App() {
    return (
        <div className="flex items-center justify-center h-screen">
          <AudioRecorder mimeType="audio/webm"></AudioRecorder>
        </div>
    );
}
