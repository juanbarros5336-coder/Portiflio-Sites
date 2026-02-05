import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Github } from 'lucide-react';
import { projectsData } from '@/data/projects';

const ProjectsSection = () => {
    // Supreme Entrance Animations (No 3D Tilt)
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Header Reveal (Split & Center)
            const titleSpans = headerRef.current?.querySelectorAll('span');
            if (titleSpans) {
                // "Meus" slides from left
                gsap.fromTo(titleSpans[0],
                    { opacity: 0, x: -60, filter: "blur(12px)" },
                    {
                        opacity: 1, x: 0, filter: "blur(0px)",
                        duration: 0.8, ease: "power4.out",
                        scrollTrigger: { trigger: headerRef.current, start: "top 92%" }
                    }
                );
                // "Projetos" slides from right
                gsap.fromTo(titleSpans[1],
                    { opacity: 0, x: 60, filter: "blur(12px)" },
                    {
                        opacity: 1, x: 0, filter: "blur(0px)",
                        duration: 0.8, ease: "power4.out", delay: 0.1,
                        scrollTrigger: { trigger: headerRef.current, start: "top 92%" }
                    }
                );
            }

            // Subtitle Reveal
            gsap.fromTo(headerRef.current?.querySelector('p'),
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2,
                    scrollTrigger: { trigger: headerRef.current, start: "top 92%" }
                }
            );

            // 2. Projects Grid (Granular Supreme Entrance)
            if (containerRef.current) {
                const cards = gsap.utils.toArray(containerRef.current.children) as HTMLElement[];

                cards.forEach((card, i) => {
                    const preview = card.querySelector('.project-preview');
                    const details = card.querySelectorAll('.project-reveal-item');

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: "top 92%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // Card Container Entrance
                    tl.fromTo(card,
                        { opacity: 0, y: 100, scale: 0.95 },
                        {
                            opacity: 1, y: 0, scale: 1,
                            duration: 0.6, ease: "power3.out"
                        }
                    );

                    // Internal Content Stagger (Supreme Details)
                    if (preview && details.length > 0) {
                        // Image slides in or unfolds
                        tl.fromTo(preview,
                            { opacity: 0, x: -30, filter: "blur(5px)" },
                            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
                            "-=0.4"
                        );

                        // Text details cascade in
                        tl.fromTo(details,
                            { opacity: 0, y: 20 },
                            {
                                opacity: 1, y: 0,
                                duration: 0.6, stagger: 0.1,
                                ease: "back.out(1.2)"
                            },
                            "-=0.6"
                        );
                    }
                });
            }

            // 3. Background Parallax (Subtle depth)
            gsap.to(".bg-particle-projects", {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="py-24 relative overflow-hidden bg-background">
            {/* Futuristic Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>

            {/* Particle Grid - Hidden on mobile for performance */}
            <div className="absolute inset-0 opacity-10 pointer-events-none hidden md:block">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-particle-projects absolute w-1 h-1 bg-primary rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div ref={headerRef} className="text-center mb-12 md:mb-24 relative">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight">
                        <span className="text-foreground drop-shadow-2xl">Meus </span>
                        <span className="hero-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent">Projetos</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        As imagens de pessoas e modelos apresentadas nestes projetos foram geradas por Inteligência Artificial.
                    </p>
                </div>

                <div ref={containerRef} className="grid grid-cols-1 gap-8 md:gap-24">
                    {projectsData.map((project, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="project-card group relative rounded-[2rem] overflow-hidden border border-white/10 bg-card/80 backdrop-blur-2xl shadow-2xl transition-shadow duration-500"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                                {/* Live Preview Window */}
                                <div className={`project-preview relative aspect-[4/3] lg:h-[600px] lg:aspect-auto w-full overflow-hidden bg-background border-b lg:border-b-0 lg:border-r border-white/10 lg:col-span-3 rounded-t-[2rem] ${index % 2 === 0 ? "lg:rounded-tr-none lg:rounded-bl-[2rem]" : "lg:order-last lg:border-r-0 lg:border-l lg:rounded-tl-none lg:rounded-br-[2rem]"} `}>

                                    {/* Browser Header */}
                                    <div className="absolute top-0 left-0 right-0 h-10 bg-[#1a1a1c] flex items-center justify-between px-4 z-20 border-b border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600" />
                                        </div>
                                        <div className="flex-1 mx-6 h-6 bg-[#000000]/20 rounded flex items-center justify-center border border-white/5 transition-colors">
                                            <span className="text-[11px] text-zinc-500 font-mono tracking-wide transition-colors">{project.url.replace('https://', '')}</span>
                                        </div>
                                        <div className="w-8" />
                                    </div>

                                    {/* Preview Image (Facade) */}
                                    <div
                                        className={`absolute inset-0 pt-10 w-full h-full bg-[#0A0A0B] transition-all duration-500 ${hoveredIndex === index ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isMobile ? 'cursor-pointer' : ''}`}
                                        onClick={() => isMobile && window.open(project.url, '_blank')}
                                    >
                                        <img
                                            src={isMobile ? project.imageMobile : project.imageDesktop}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
                                            loading="lazy"
                                        />
                                        {!isMobile && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all">
                                                <span className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-sm font-medium border border-white/10 opacity-100 group-hover:opacity-0 transition-opacity">
                                                    Interagir
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Iframe Preview (Lazy Load on Hover/Interaction) */}
                                    <div className={`absolute inset-0 pt-10 w-full h-full bg-[#0A0A0B] transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                                        {hoveredIndex === index && (
                                            <iframe
                                                src={project.url}
                                                title={project.title}
                                                className="w-full h-full bg-white"
                                                style={{ border: 'none' }}
                                                loading="lazy"
                                            />
                                        )}
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
                                </div>

                                {/* Project Info */}
                                <div className="project-info relative p-8 lg:p-12 flex flex-col justify-center overflow-hidden lg:col-span-2">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                                    <div className="relative z-10 pointer-events-none">
                                        <div className="project-reveal-item flex items-center gap-3 mb-6">
                                            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className="project-reveal-item text-3xl lg:text-5xl font-bold text-white mb-6 leading-tigher transition-all duration-300">
                                            {project.title}
                                        </h3>

                                        <p className="project-reveal-item text-zinc-400 text-lg leading-relaxed mb-8">
                                            {project.description}
                                        </p>

                                        <div className="project-reveal-item flex flex-wrap gap-2 mb-10">
                                            {project.tech.map((tech, i) => (
                                                <span key={i} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-xs text-zinc-300 font-mono">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="project-reveal-item flex gap-4 pointer-events-auto">
                                            <button
                                                onClick={() => window.open(project.url, '_blank')}
                                                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                                            >
                                                Ver Projeto <ArrowUpRight className="w-4 h-4" />
                                            </button>
                                            <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105 active:scale-95">
                                                <Github className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </section >
    );
};

export default ProjectsSection;
