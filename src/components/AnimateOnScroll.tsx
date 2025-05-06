// components/FadeInOnScroll.tsx

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animation?: Record<string, any>;
    delay?: number;
};

export default function AnimateOnScroll({
    children,
    animation,
    delay = 0,
}: Props) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={animation?.initial || { opacity: 0, y: 30 }}
            animate={inView ? animation?.animate || { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay }}
        >
            {children}
        </motion.div>
    );
}
