import Card from 'react-animated-3d-card';
import { HoverBorderGradient } from './ui/hover-border-gradient';

function PhoneLogo() {
    return (
        <div className="w-11 h-11 flex justify-center items-center rounded-full bg-sky-400">
            <div className="w-8 h-8 absolute animate-ping rounded-full bg-sky-400/90 z-0" />
            <svg
                className="z-10"
                width="20"
                height="22"
                fill="slate-800"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
        </div>
    );
}

function RecordLogo() {
    return (
        <HoverBorderGradient containerClassName="w-14 h-14 flex justify-center items-center rounded-full bg-slate-950">
            <svg
                width="24"
                height="24"
                viewBox="0 0 352 512"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" />
            </svg>
        </HoverBorderGradient>
    );
}

function GradientLine() {
    return (
        <div className="relative flex justify-center w-[22rem]">
            <div className="absolute bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[3px] w-3/4 blur-sm" />
            <div className="absolute bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4" />
            <div className="absolute bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[6px] w-1/3 blur-sm" />
            <div className="absolute bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[2px] w-1/3" />
            <div className="absolute w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
        </div>
    );
}

export function HeroCard() {
    return (
        <Card
            style={{
                display: 'relative',
                backgroundImage:
                    'linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2)',
                animation: 'spincard 2.5s linear infinite',
                width: '270px',
                height: '400px',
            }}
            borderRadius={'1.2rem'}
            shineStrength={0.5}
            cursorPointer={false}
        >
            <div
                className="absolute bg-black rounded-2xl top-1 left-1"
                style={{
                    width: 'calc(100% - 0.5rem)',
                    height: 'calc(100% - 0.5rem)',
                }}
            />
            <span />
            <div className="absolute w-full flex justify-center top-9">
                <img
                    className="w-28 h-28 rounded-full"
                    src={'src/assets/pokimane.webp'}
                />
            </div>
            <div
                className="absolute w-full flex justify-center"
                style={{ top: '2rem' }}
            >
                <div
                    className="border-dotted border-2 border-white rounded-full"
                    style={{
                        width: '7.5rem',
                        height: '7.5rem',
                        animation: 'spin 25s linear infinite',
                    }}
                />
            </div>
            <div className="absolute top-28 right-16">
                <PhoneLogo />
            </div>

            <div
                className="absolute"
                style={{ left: 'calc(50% - 11rem)', bottom: '4.8rem' }}
            >
                <GradientLine />
            </div>
            <div className="absolute bottom-12 flex justify-center w-full">
                <RecordLogo />
            </div>
            <h1 className="absolute top-44 w-full text-4xl font-medium uppercase tracking-[0.16em] text-center text-white">
                Rizz.AI
            </h1>
            <h3 className="absolute top-56 w-full text-1xl font-thin tracking-tight text-center text-white">
                rizz anytime. anywhere.
                <br />
                powered by AI.
            </h3>
        </Card>
    );
}
