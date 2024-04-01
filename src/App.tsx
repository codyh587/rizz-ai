import { Background } from './components/Background';
import { RevealOnScroll } from './components/RevealOnScroll';
import { Hero } from './components/Hero';
import { Slider } from './components/Slider';
import { Record } from './components/Record';
import { Footer } from './components/Footer';

export default function App() {
    return (
        <Background>
            <Hero />
            <RevealOnScroll>
                <Slider />
                <Record />
            </RevealOnScroll>
            <Footer />
        </Background>
    );
}
