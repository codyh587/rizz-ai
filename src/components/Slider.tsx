const images: string[] = [
    'src/assets/lilypichu.webp',
    'src/assets/fuslie.webp',
    'src/assets/valkyrae.webp',
    'src/assets/blau.webp',
    'src/assets/gordon.webp',
    'src/assets/xqc.webp',
    'src/assets/gojo.webp',
    'src/assets/vaporeon.webp',
];

function ImageSection() {
    return (
        <div
            className="flex"
            style={{ animation: 'swipe 25000ms linear infinite' }}
        >
            {images.map((src) => (
                <div key={src} className="w-32 h-32 grayscale mx-16">
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
                id="player"
                className="text-center mt-5 pt-9 mb-24 text-3xl leading-[1.5] tracking-tighter sm:text-[2.5rem] sm:leading-[3.5rem]"
            >
                AI companions to help you master your rizz
            </h3>
            <div className="flex relative mb-36 ">
                <ImageSection />
                <ImageSection />
                <div
                    className="flex absolute w-full justify-center border-y border-white/10"
                    style={{ bottom: '-64px' }}
                >
                    <img
                        className="w-64 h-64 rounded-full"
                        src={'src/assets/pokimane.webp'}
                    />
                </div>
            </div>
        </>
    );
}
