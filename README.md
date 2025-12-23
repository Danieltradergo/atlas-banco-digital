# Banco Atlas - Site Institucional Full-Stack

> **Projeto completo de um banco digital** inspirado no Bank of America. Site responsivo com frontend, backend, autenticação admin, captura de leads e dashboard administrativo. Pronto para produção.

## ⚡ Status do Projeto

**Versão**: 0.1.0  
**Estado**: Em Desenvolvimento (MVP Pronto) ✅  
**Stack**: Next.js 14, React 18, PostgreSQL, Prisma, Tailwind CSS

---

## 📊 Sobre

O Banco Atlas é um **projeto full-stack de demonstração** que demonstra:

- ✅ **Design Profissional**: Layout bancário responsivo inspirado em grandes instituições
- ✅ **Frontend Moderno**: Next.js 14 com Tailwind CSS e componentes reutilizáveis
- ✅ **Backend Robusto**: API REST com autenticação JWT e validações
- ✅ **Banco de Dados**: PostgreSQL com Prisma ORM
- ✅ **Autenticação Admin**: Sistema seguro com hashing de senhas
- ✅ **Captura de Leads**: Formulário com validação e armazenamento
- ✅ **Dashboard Admin**: Área restrita com filtros e exportação CSV
- ✅ **SEO Otimizado**: Meta tags, headings hierárquicos, mobile-friendly
- ✅ **100% Responsivo**: Desktop, tablet, mobile

---

## 💡 Funcionalidades Principais

### Páginas Públicas

- **Home (/)** - Hero, destaques de produtos, educação financeira, segurança, app mobile
- **/conta-cartoes** - Comparativa de contas (Básica, Gold, Platinum)
- **/emprestimos** - Tipos de empréstimos com simulador
- **/investimentos** - Produtos (CDB, fundos) e perfis de risco
- **/ajuda** - FAQ com 15+ perguntas comuns
- **/sobre** - História fictícia, missão e valores do banco

### Funcionalidades Backend

- **POST /api/leads** - Criar novo lead (público)
- **POST /api/admin/auth** - Login admin com JWT
- **GET /api/admin/leads** - Listar leads (autenticado)
- **GET /api/admin/leads?export=csv** - Exportar CSV (autenticado)
- **DELETE /api/admin/leads/:id** - Deletar lead (autenticado)

### Admin Dashboard

- Visualizar todos os leads capturados
- Filtrar por tipo de produto de interesse
- Exportar dados em CSV
- Sistema de login seguro

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Instalação Local

```bash
# 1. Clone o repositório
git clone https://github.com/Danieltradergo/atlas-banco-digital.git
cd atlas-banco-digital

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais de banco

# 4. Configure o banco
npx prisma migrate dev --name init

# 5. Inicie o servidor
npm run dev

# Acesse http://localhost:3000
```

---

## 📄 Documentação

Todos os arquivos de documentação estão na raiz do repositório:

- **[IMPLEMENTACAO_COMPLETA.md](./IMPLEMENTACAO_COMPLETA.md)** - Estrutura completa do projeto com todos os arquivos de configuração
- **[GUIA_DEPLOYMENT_E_TESTES.md](./GUIA_DEPLOYMENT_E_TESTES.md)** - Passo a passo de deployment, testes e checklist de produção
- **[package.json](./package.json)** - Dependências e scripts

---

## 📃 Stack Técnico

### Frontend
- **Next.js 14** - Framework React para web
- **React 18** - Library UI
- **Tailwind CSS** - Estilização utilitária
- **TypeScript** - Type safety
- **React Hook Form** - Gerenciamento de formulários

### Backend
- **Next.js API Routes** - Endpoints serverless
- **Prisma ORM** - Acesso ao banco de dados
- **bcryptjs** - Hash seguro de senhas
- **JWT** - Autenticação stateless

### Banco de Dados
- **PostgreSQL** - Banco relacional
- **Prisma Migrations** - Versionamento de schema

### DevOps
- **Vercel** - Hosting para produção
- **GitHub** - Controle de versão
- **GitHub Actions** - CI/CD (opcional)

---

## 📋 Estrutura de Pastas

```
atlas-banco-digital/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Home
│   ├── (public)/          # Rotas públicas
│   ├── admin/             # Rotas admin protegidas
│   └── api/               # Endpoints API
├── components/            # Componentes React reutilizáveis
├── lib/                   # Funções utilitárias
├── styles/                # CSS global
├── public/                # Assets estáticos
├── prisma/                # Schema e migrations
├── package.json           # Dependências
├── tsconfig.json          # Configuração TypeScript
├── tailwind.config.js     # Configuração Tailwind
└── next.config.js         # Configuração Next.js
```

---

## 🚾 Modelos de Dados

### Lead
```typescript
id: String              // ID único
nomeCompleto: String   // Nome completo
email: String          // Email para contato
telefone: String       // Telefone
tipoProdutoInteresse: String  // conta | cartao | emprestimo | investimentos
dataHoraCriacao: DateTime     // Timestamp de criação
```

### UserAdmin
```typescript
id: String        // ID único
email: String     // Email único
password: String  // Hashed com bcryptjs
nome: String      // Nome do admin
ativo: Boolean    // Ativo/Inativo
criadoEm: DateTime // Data de criação
ultimoLogin: DateTime? // Último acesso
```

---

## 📁 Como Fazer Deploy

### Vercel (Recomendado)

1. Push seu código para GitHub
2. Acesse vercel.com e crie novo projeto
3. Selecione `atlas-banco-digital`
4. Configure variáveis de ambiente
5. Deploy automático na push

**Veja [GUIA_DEPLOYMENT_E_TESTES.md](./GUIA_DEPLOYMENT_E_TESTES.md) para detalhes completos**

---

## 🗪️ Testes

### Testes Manuais
```bash
# 1. Teste formulário de lead
Acesse http://localhost:3000 e preencha "Abrir Conta"

# 2. Teste login admin
Acesse http://localhost:3000/admin/login
Email: admin@bancoatlas.com

# 3. Teste dashboard
Visualize leads, filtre, exporte CSV
```

### Testes de API (cURL)
```bash
# Criar lead
curl -X POST http://localhost:3000/api/leads \\
  -H "Content-Type: application/json" \\
  -d '{
    "nomeCompleto": "João Silva",
    "email": "joao@teste.com",
    "telefone": "11999999999",
    "tipoProdutoInteresse": "conta"
  }'
```

**Veja [GUIA_DEPLOYMENT_E_TESTES.md](./GUIA_DEPLOYMENT_E_TESTES.md) para testes completos**

---

## 📄 Licença

MIT - Livre para uso pessoal e comercial

---

## 🙋 Contribuições

Este é um projeto de demonstração. Sinta-se livre para usar como referência para seus próprios projetos!

---

## 💿 Suporte

Para dúvidas ou melhorias, abra uma [Issue](https://github.com/Danieltradergo/atlas-banco-digital/issues) ou [Pull Request](https://github.com/Danieltradergo/atlas-banco-digital/pulls).

---

**Desenvolvido com ❤️ em Dezembro de 2025**
