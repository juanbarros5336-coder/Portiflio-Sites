import { GradientButton } from '@/components/ui/gradient-button';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { lazy, Suspense } from 'react';

const TubesBackground = lazy(() => import('@/components/ui/neon-flow').then(module => ({ default: module.TubesBackground })));
const Tilt = lazy(() => import('react-parallax-tilt'));

const HeroSection = () => {
  // Animation hooks
  const { heroRef, titleRef, ctaRef } = useHeroAnimation();
  const { ref: ctaButtonRef, handleMouseMove: handleCTAMove, handleMouseLeave: handleCTALeave } = useMagneticEffect();
  const { ref: pleasureMagneticRef, handleMouseMove: handlePleasureMove, handleMouseLeave: handlePleasureLeave } = useMagneticEffect();
  const { ref: nameMagneticRef, handleMouseMove: handleNameMove, handleMouseLeave: handleNameLeave } = useMagneticEffect();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {!isMobile && (
        <Suspense fallback={null}>
          <TubesBackground className="absolute inset-0 z-0" />
        </Suspense>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-background/30 via-background/50 to-background/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-7xl sm:text-8xl md:text-7xl lg:text-8xl font-bold leading-none mb-8 tracking-tight perspective-container flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4"
        >
          <div
            ref={pleasureMagneticRef}
            onMouseMove={handlePleasureMove}
            onMouseLeave={handlePleasureLeave}
            className="-mb-4 sm:mb-0 will-change-transform cursor-default z-10 flex gap-1 sm:gap-2"
          >
            {/* Split text for supreme staggered animation */}
            <div className="flex">
              {"Prazer".split('').map((char, i) => (
                <span key={i} className="inline-block origin-bottom">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </div>
          </div>
          <div
            ref={nameMagneticRef}
            onMouseMove={handleNameMove}
            onMouseLeave={handleNameLeave}
            className="relative inline-block cursor-default z-10"
          >
            {isMobile ? (
              <span className="relative inline-block hero-gradient-text">
                Juan
                {/* Simplified Static Glow for Mobile */}
                <span
                  className="absolute inset-0 hero-gradient-text opacity-40 blur-xl select-none"
                  aria-hidden="true"
                >
                  Juan
                </span>
              </span>
            ) : (
              <Suspense fallback={
                <span className="relative inline-block hero-gradient-text">
                  Juan
                  <span className="absolute inset-0 hero-gradient-text opacity-40 blur-xl select-none" aria-hidden="true">Juan</span>
                </span>
              }>
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={1000}
                  transitionSpeed={1500}
                  scale={1.1}
                  gyroscope={true}
                  className="preserve-3d will-change-transform"
                >
                  <span className="relative inline-block hero-gradient-text transform-gpu transition-all">
                    Juan
                    {/* Advanced Multi-layered Glow */}
                    <span
                      className="absolute inset-0 hero-gradient-text opacity-40 blur-2xl select-none"
                      aria-hidden="true"
                      style={{ transform: 'translateZ(-20px)' }}
                    >
                      Juan
                    </span>
                    <span
                      className="absolute inset-0 hero-gradient-text opacity-20 blur-3xl select-none scale-125"
                      aria-hidden="true"
                      style={{ transform: 'translateZ(-40px)' }}
                    >
                      Juan
                    </span>
                    {/* Outer Glow */}
                    <span
                      className="absolute -inset-4 bg-primary/20 blur-[60px] rounded-full -z-10 animate-pulse"
                      aria-hidden="true"
                    />
                  </span>
                </Tilt>
              </Suspense>
            )}
          </div>
        </h1>

        {/* CTA Button */}
        <div ref={ctaRef} className="flex justify-center items-center mt-12 perspective-1000">
          <div
            ref={ctaButtonRef}
            className="relative will-change-transform transform-style-3d" // Optimizes 3D rendering
            onMouseMove={handleCTAMove}
            onMouseLeave={handleCTALeave}
          >
            {/* 3D Glow Effect Layers */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[12px] blur opacity-40 group-hover:opacity-70 transition duration-500 -z-10" />

            <GradientButton
              onClick={scrollToAbout}
              variant="variant"
              className="relative z-10 px-8 py-4 text-lg font-bold shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              Conhecer mais
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;