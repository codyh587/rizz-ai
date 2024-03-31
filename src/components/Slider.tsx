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

const sliderImagesStyle = { animation: 'swipe 25000ms linear infinite' };

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
        <>
            <h3
                id="slider"
                className="text-center mt-5 pt-3 mb-28 text-3xl leading-[1.5] tracking-tighter sm:text-[2.5rem] sm:leading-[3.5rem]"
            >
                AI companions to help you master your rizz
            </h3>
            <div className="flex relative mb-28 ">
                <ImageSection />
                <ImageSection />
                <div
                    className="flex absolute w-full justify-center border border-white/10"
                    style={{ bottom: '-64px' }}
                >
                    <img
                        className="w-64 h-64 rounded-full"
                        src={'src/assets/pokimane.jpg'}
                    />
                </div>
            </div>
        </>
    );
}
