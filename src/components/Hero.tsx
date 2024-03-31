import { GitHubLogoIcon } from '@radix-ui/react-icons';

export function Hero() {
    return (
        <>
            {/* Title points */}
            <div className="flex items-center justify-center text-sm font-medium uppercase tracking-[0.16em]">
                <p className="hidden lg:block">
                    Powered by <span className="text-white">Google Gemini</span>
                </p>
                <div className="mx-6 hidden h-[0.1875rem] w-[0.1875rem] rounded-full bg-white/30 lg:block xl:mx-16" />
                <p>
                    Voiced with <span className="text-white">Elevenlabs</span>
                </p>
                <div className="mx-6 hidden h-[0.1875rem] w-[0.1875rem] rounded-full bg-white/30 lg:block xl:mx-16" />
                <span className="ml-2">
                    Transcribed with <span className="text-white">Whisper</span>
                </span>
            </div>

            {/* Main container */}
            <section className="container grid lg:grid-cols-10 place-items-center py-20 mx-7 md:py-32 gap-10">
                <div className="col-span-6 text-center lg:text-start space-y-6">

                    {/* Main splash text */}
                    <h1 className="bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD_14.06%,#709DF7_51.02%,#4D78EF_79.09%)] bg-clip-text text-5xl leading-[1.2] tracking-tighter text-transparent sm:text-center sm:text-[4rem] sm:leading-[4.75rem] lg:text-left">
                        Make your rizz incredible, without the embarrassing help
                        of friends.
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 max-w-3xl text-2xl leading-[2.5rem] tracking-tight sm:text-center lg:text-left">
                        AI-powered rizz-response software, right at your
                        fingertips.
                    </p>

                    {/* Buttons */}
                    <div className="mt-12 hidden lg:flex">
                        <button className="rounded-full bg-sky-300 py-2 px-6 font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900">
                            Get Started
                        </button>
                        <a
                            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                            target="_blank"
                            className="flex ml-6 rounded-full border border-white/10 bg-slate-700/40 py-2 px-6 font-semibold text-white hover:border-white/20 hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                            GitHub Repository
                            <GitHubLogoIcon className="ml-2 w-5 h-5 mt-0.5" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
