const images: string[] = [
    'src/assets/lilypichu.jpg',
    'src/assets/fuslie.jpg',
    'src/assets/valkyrae.jpg',
    'src/assets/blau.jpg',
    'src/assets/gordon.jpg',
    'src/assets/xqc.webp',
    'src/assets/gojo.jpg',
    'src/assets/vaporeon.jpg',
];

const sliderImagesStyle = { animation: 'swipe 20000ms linear infinite' };

function ImageSection() {
    return (
        <div className="flex" style={sliderImagesStyle}>
            {images.map((src) => (
                <div className="w-32 h-32 grayscale mx-16">
                    <img className="rounded-full" src={src} />
                </div>
            ))}
        </div>
    );
}

export function Slider() {
    return (
        <div className="flex">
            <ImageSection />
            <ImageSection />
        </div>
    );
}
