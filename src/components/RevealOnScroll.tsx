import { useState, useEffect, useRef, ReactNode } from 'react';

interface RevealOnScrollProps {
    children: ReactNode;
}

export function RevealOnScroll({ children }: RevealOnScrollProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                scrollObserver.unobserve(entry.target);
            }
        });

        scrollObserver.observe(ref.current!);

        return () => {
            if (ref.current) {
                scrollObserver.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-opacity duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {children}
        </div>
    );
}
