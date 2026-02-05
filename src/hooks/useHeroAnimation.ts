import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function useHeroAnimation() {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const ctaButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            const prazerContainer = titleRef.current?.querySelector('div:first-child');
            const prazerLetters = prazerContainer?.children; // Note: Ensure HTML structure matches
            const juanContainer = titleRef.current?.children[1];

            // Initial visibility handling
            if (prazerLetters) gsap.set(prazerLetters, { opacity: 0 });
            if (juanContainer) gsap.set(juanContainer, { opacity: 0 });
            if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0 });
            if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 0 });

            // Timeline
            const tl = gsap.timeline({ delay: 1.5 });

            // 1. Title Reveal
            if (prazerLetters?.length) {
                // Hint browser to prepare layers
                gsap.set(prazerLetters, { willChange: "transform, opacity" });

                tl.fromTo(prazerLetters,
                    {
                        opacity: 0,
                        y: 40,
                        transformOrigin: "bottom center"
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.04,
                        ease: "power3.out",
                        onComplete: () => {
                            // Release memory after animation
                            gsap.set(prazerLetters, { willChange: "auto" });
                        }
                    }
                );
            }

            // 'Juan' enters
            if (juanContainer) {
                tl.fromTo(juanContainer,
                    {
                        opacity: 0,
                        scale: 0.8,
                        rotationX: isMobile ? 0 : -20,
                        transformOrigin: "center center"
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotationX: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        force3D: true // Keep on this single large element
                    },
                    "-=0.8"
                );
            }

            // 2. Subtitle
            if (subtitleRef.current) {
                tl.fromTo(subtitleRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", force3D: true },
                    "-=0.8"
                );
            }

            // 3. CTA Button
            if (ctaRef.current) {
                tl.fromTo(ctaRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        force3D: true
                    },
                    "-=0.6"
                );
            }

            // Floating Animation - Only on Desktop for perf
            if (!isMobile && ctaButtonRef.current) {
                gsap.to(ctaButtonRef.current, {
                    y: -10,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 2 // Wait for entrance to finish
                });
            }

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return { heroRef, titleRef, subtitleRef, ctaRef, ctaButtonRef };
}

