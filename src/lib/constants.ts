// Application constants and configuration
export const APP_CONFIG = {
  // Contact information
  WHATSAPP_NUMBER: '5521960169230',
  EMAIL: 'contact@juan-dev.com',

  // Social links
  SOCIAL_LINKS: {
    linkedin: 'https://linkedin.com/in/juan-dev',
    github: 'https://github.com/juan-dev',
    instagram: 'https://instagram.com/juan.dev'
  },

  // SEO
  SITE_NAME: 'Juan - Desenvolvedor Web Premium',
  SITE_URL: 'https://juan-dev-portfolio.com',
  SITE_DESCRIPTION: 'Desenvolvedor Web especializado em sites futuristas, landing pages premium e soluções digitais modernas.',

  // Performance
  LAZY_LOADING_THRESHOLD: '100px',
  ANIMATION_DURATION: 300,

  // Security
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

// WhatsApp message templates
export const WHATSAPP_MESSAGES = {
  DEFAULT: 'Olá! Gostaria de conversar sobre meu projeto de site. Pode me ajudar?',
  QUOTE: 'Olá! Gostaria de solicitar um orçamento para um projeto. Podemos conversar?',
  SUPPORT: 'Olá! Preciso de suporte técnico. Está disponível?'
} as const;

// Form validation rules
export const VALIDATION_RULES = {
  NAME: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s]+$/
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  MESSAGE: {
    minLength: 10,
    maxLength: 500
  }
} as const;