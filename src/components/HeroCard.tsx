import Card from 'react-animated-3d-card';

export function HeroCard() {
    return (
        <Card
            style={{
                background: 'rgb(2 6 23)',
                width: '285px',
                height: '400px',
            }}
            shineStrength={0.5}
            cursorPointer={false}
        >
            <div className="flex flex-col h-full items-center overflow-hidden rounded-md">
                <img
                    className="w-32 h-32 mt-10 rounded-full"
                    src={'src/assets/pokimane.webp'}
                />
                <h1 className="text-4xl pt-6 h-full font-medium uppercase tracking-[0.16em] text-center text-white relative z-20">
                    Rizz.AI
                </h1>

                <div className="flex justify-center items-center w-16 h-64 rounded-full shadow-md border border-white/10 bg-slate-950">
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 352 512"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" />
                    </svg>
                </div>

                <div className="w-[40rem] h-48 relative">
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
                    <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
                </div>
            </div>
        </Card>
    );
}
