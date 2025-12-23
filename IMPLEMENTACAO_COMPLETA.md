# ATLAS BANCO DIGITAL - IMPLEMENTACAO COMPLETA

## ESTRUTURA DO PROJETO (Copie e cole em seu ambiente local)

### 1. ARQUIVOS DE CONFIGURACAO RAIZ

#### .gitignore
```
node_modules/
.env.local
.env*.local
.next/
build/
dist/
.DS_Store
*.log
.vercel
prisma/migrations/
```

#### .env.example
```
DATABASE_URL="postgresql://user:password@localhost:5432/atlas_banco"
NEXT_PUBLIC_API_URL="http://localhost:3000"
ADMIN_EMAIL="admin@bancoatlas.com"
ADMIN_PASSWORD_HASH="$2a$10$..."
NEXT_PUBLIC_SITE_NAME="Banco Atlas"
JWT_SECRET="sua-chave-super-secreta"
```

#### next.config.js
```javascript
const withPWA = require('next-pwa')({  
  dest: 'public',
  register: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: false,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
});
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

#### tailwind.config.js
```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'atlas-blue': '#1e40af',
        'atlas-dark': '#0f172a',
        'atlas-red': '#dc2626',
        'atlas-accent': '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

#### postcss.config.js
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 2. SCHEMA PRISMA

Arquivo: `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Lead {
  id                   String   @id @default(cuid())
  nomeCompleto         String
  email                String
  telefone             String
  tipoProdutoInteresse String   // conta, cartao, emprestimo, investimentos
  origem               String   @default("site")
  dataHoraCriacao      DateTime @default(now())
  atualizadoEm         DateTime @updatedAt
  
  @@index([email])
  @@index([dataHoraCriacao])
}

model UserAdmin {
  id       String   @id @default(cuid())
  email    String   @unique
  password String   // bcrypt hash
  nome     String
  ativo    Boolean  @default(true)
  criadoEm DateTime @default(now())
  ultimoLogin DateTime?
  
  @@index([email])
}
```

### 3. ESTRUCTURA DE PASTAS RECOMENDADA

```
atlas-banco-digital/
├── app/                         # Next.js App Router
│   ├── layout.tsx              # Layout raiz com Header e Footer
│   ├── page.tsx                # Home
│   ├── metadata.ts             # SEO metadata
│   ├── globals.css             # Estilos globais
│   ├── (public)/               # Grupo de rotas públicas
│   │   ├── conta-cartoes/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── emprestimos/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── investimentos/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── ajuda/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── sobre/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── admin/                  # Grupo de rotas admin
│   │   ├── login/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── leads/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── middleware.ts       # Proteção de rotas
│   └── api/                    # Rotas API
│       ├── leads/
│       │   └── route.ts        # POST para criar lead
│       ├── admin/
│       │   ├── auth/
│       │   │   └── route.ts    # POST login
│       │   ├── leads/
│       │   │   └── route.ts    # GET leads, DELETE lead
│       │   └── export/
│       │       └── route.ts    # GET CSV export
│       └── health/
│           └── route.ts        # GET health check
├── components/                 # Componentes React reutilizáveis
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Cards/
│   │   ├── ProductCard.tsx
│   │   ├── FeatureCard.tsx
│   │   └── TestimonialCard.tsx
│   ├── Forms/
│   │   ├── LeadForm.tsx
│   │   ├── LoginForm.tsx
│   │   └── SimulatorForm.tsx
│   ├── Sections/
│   │   ├── Highlights.tsx
│   │   ├── FinancialHabits.tsx
│   │   ├── Security.tsx
│   │   ├── MobileApp.tsx
│   │   ├── FAQ.tsx
│   │   └── CTA.tsx
│   └── Admin/
│       ├── LeadsTable.tsx
│       ├── Filters.tsx
│       └── ExportButton.tsx
├── lib/                        # Utilitários
│   ├── db.ts                  # Prisma client
│   ├── auth.ts                # Funções de autenticação
│   ├── api-client.ts          # Cliente HTTP
│   ├── validators.ts          # Validação de dados
│   ├── constants.ts           # Constantes globais
│   └── utils.ts               # Funções utilitárias
├── styles/                     # Estilos CSS
│   ├── globals.css
│   ├── components.css
│   └── animations.css
├── public/                     # Assets estáticos
│   ├── images/
│   ├── icons/
│   └── fonts/
├── prisma/                     # Prisma ORM
│   ├── schema.prisma
│   ├── seed.ts                 # Data de inicialização
│   └── migrations/
├── __tests__/                  # Testes
│   ├── components/
│   ├── pages/
│   └── api/
├── docs/                       # Documentação
│   ├── ARQUITETURA.md
│   ├── API.md
│   └── DEPLOYMENT.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## PROXIMAS SECOES

Por favor, aguarde. Vou prosseguir com:
- **Seção 4**: Código completo de componentes (Header, Footer, Hero, Cards, Formulários)
- **Seção 5**: Código de páginas públicas (Home, Contas, Empréstimos, etc.)
- **Seção 6**: Código de API routes (leads, auth, admin)
- **Seção 7**: Sistema de autenticação admin
- **Seção 8**: Prisma seed e migrations
- **Seção 9**: Testes
- **Seção 10**: Deployment e checklist final
