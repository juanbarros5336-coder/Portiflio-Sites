import { useRef } from 'react';
import { gsap } from 'gsap';

interface UseCard3DTiltReturn {
    cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
    handleMouseLeave: (index: number) => void;
}

export function useCard3DTilt(): UseCard3DTiltReturn {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 1000,
            transformStyle: "preserve-3d"
        });
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)"
        });
    };

    return { cardsRef, handleMouseMove, handleMouseLeave };
}
