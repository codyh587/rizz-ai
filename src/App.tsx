import { Hero } from './components/Hero';

export default function App() {
    return (
        <header className="overflow-hidden bg-[radial-gradient(145.05%_100%_at_50%_0%,#1D2B41_0%,#020509_57.38%,#0F1A29_88.16%)] pt-8 pb-24 text-slate-400 lg:py-16">
            <Hero />
            <p>footer</p>
        </header>
    );
}
