import { useGSAPReveal } from '@/hooks/useGSAPReveal';

interface UseTestimonialsAnimationReturn {
    sectionRevealRef: React.MutableRefObject<HTMLDivElement | null>;
    headerRevealRef: React.MutableRefObject<HTMLDivElement | null>;
    gridRevealRef: React.MutableRefObject<HTMLDivElement | null>;
}

export function useTestimonialsAnimation(): UseTestimonialsAnimationReturn {
    const sectionRevealRef = useGSAPReveal({
        direction: 'up',
        distance: 50,
        duration: 1
    });

    const headerRevealRef = useGSAPReveal({
        direction: 'up',
        distance: 30,
        stagger: 0.2
    });

    const gridRevealRef = useGSAPReveal({
        direction: 'up',
        distance: 80,
        scale: 0.9,
        rotationY: 15,
        stagger: 0.1,
        duration: 0.8
    });

    return {
        sectionRevealRef,
        headerRevealRef,
        gridRevealRef
    };
}
