export interface Project {
    title: string;
    category: string;
    url: string;
    imageDesktop: string;
    imageMobile: string;
    description: string;
    tech: string[];
}

export const projectsData: Project[] = [
    {
        title: "Dra. Carolina Mendes",
        category: "Psicologia",
        url: "https://carolinamendes.netlify.app",
        imageDesktop: "/projects/nutritionist-desktop.webp",
        imageMobile: "/projects/nutritionist-mobile.png",
        description: "Website profissional desenvolvido para psicóloga, com design acolhedor, blog integrado e sistema de agendamento.",
        tech: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
        title: "Modelo: Jurídico & Corporativo",
        category: "Advocacia / Consultoria",
        url: "#",
        imageDesktop: "/projects/lawyer-desktop.webp",
        imageMobile: "/projects/lawyer-mobile.webp",
        description: "Estrutura corporativa focada em autoridade e captação de clientes.",
        tech: ["React", "TypeScript", "Tailwind CSS"]
    }
];
