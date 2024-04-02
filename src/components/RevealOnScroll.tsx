import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealOnScrollProps {
    children: ReactNode;
}

export function RevealOnScroll({ children }: RevealOnScrollProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0,
                duration: 0.6,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    );
}
