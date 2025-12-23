# GUIA PRÁTICO: DEPLOYMENT E TESTES
## Banco Atlas - Site Digital Completo

---

## FASE 1: SETUP LOCAL (1-2 horas)

### 1.1 Clone do Repositório
```bash
git clone https://github.com/Danieltradergo/atlas-banco-digital.git
cd atlas-banco-digital
```

### 1.2 Instale Dependências
```bash
npm install
# ou
yarn install
```

### 1.3 Configure Banco de Dados

Opção A - Banco Local (PostgreSQL)
```bash
# Crie um banco de dados local
psql -U postgres
CREATE DATABASE atlas_banco;
```

Opção B - Banco Cloud (Vercel Postgres ou Heroku)
```bash
# Obtenha a URL do banco
# Exemplo: postgresql://user:password@host:5432/atlas_banco
```

### 1.4 Configure Variáveis de Ambiente
Crie arquivo `.env.local`:
```
DATABASE_URL="postgresql://user:pass@localhost:5432/atlas_banco"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Banco Atlas"
JWT_SECRET="chave-segura-aqui-minimo-32-caracteres"
ADMIN_EMAIL="admin@bancoatlas.com"
ADMIN_PASSWORD="senha-admin-temporaria-123"
```

### 1.5 Crie o Schema do Banco
```bash
npx prisma migrate dev --name init
```

### 1.6 Inicie o Servidor
```bash
npm run dev
# Server rodando em http://localhost:3000
```

---

## FASE 2: TESTES MANUAIS (30 minutos)

### 2.1 Teste a Home Page
- Acesse http://localhost:3000
- Verifique:
  - ✓ Header com navegação
  - ✓ Hero section com CTAs
  - ✓ Cards de produtos
  - ✓ Seção de hábitos financeiros
  - ✓ Seção de segurança
  - ✓ Seção app mobile
  - ✓ Footer completo
  - ✓ Responsividade em mobile

### 2.2 Teste Formulário de Lead
- Preencha e envie o formulário "Abrir Conta"
- Dados de teste:
  - Nome: "João Silva"
  - Email: "joao@teste.com"
  - Telefone: "11999999999"
  - Produto: "conta"
- Verifique mensagem de sucesso

### 2.3 Teste Login Admin
- Acesse http://localhost:3000/admin/login
- Email: admin@bancoatlas.com
- Password: (a senha que você configurou)
- Deve redirecionare para /admin/leads

### 2.4 Teste Dashboard Admin
- Visualize lista de leads
- Teste filtros por tipo de produto
- Teste export CSV
- Logout

### 2.5 Teste Navegação de Páginas
- /conta-cartoes - Comparativa de contas
- /emprestimos - Simulador de empréstimos
- /investimentos - Produtos de investimento
- /ajuda - FAQ
- /sobre - História da empresa

---

## FASE 3: TESTES AUTOMATIZADOS

### 3.1 Testes de API (cURL)

**Teste POST /api/leads**
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{  
    "nomeCompleto": "Maria Santos",
    "email": "maria@teste.com",
    "telefone": "21987654321",
    "tipoProdutoInteresse": "emprestimo"
  }'

# Resposta esperada:
# {"success": true, "message": "Lead criado com sucesso"}
```

**Teste POST /api/admin/auth**
```bash
curl -X POST http://localhost:3000/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{  
    "email": "admin@bancoatlas.com",
    "password": "sua-senha"
  }'

# Retorna JWT token
```

**Teste GET /api/admin/leads (com autenticação)**
```bash
curl -X GET http://localhost:3000/api/admin/leads \
  -H "Authorization: Bearer SEU_JWT_TOKEN"

# Retorna lista de leads em JSON
```

### 3.2 Testes Unitários (Jest)
```bash
npm run test

# Exemplos de testes a implementar:
# - Validação de email no formulário
# - Formatação de telefone
# - Cálculo de simulação de empréstimo
# - Autenticação admin
```

### 3.3 Testes E2E (Playwright)
```bash
npm install -D @playwright/test
npm run test:e2e

# Testes incluem:
# - Flow de cadastro de lead
# - Flow de login admin
# - Navegação entre páginas
# - Responsividade em diferentes devices
```

---

## FASE 4: CHECKLIST PRÉ-PRODUÇÃO

### 4.1 Backend
- [ ] Validações de entrada funcionam
- [ ] Erros retornam status HTTP corretos
- [ ] Prisma migrations aplicadas
- [ ] Logs de erro configurados
- [ ] Rate limiting implementado (opcional)
- [ ] CORS configurado corretamente

### 4.2 Frontend
- [ ] Todos os componentes renderizam
- [ ] Formulários validam dados
- [ ] Mensagens de erro/sucesso aparecem
- [ ] Design responsivo funciona
- [ ] SEO meta tags estão corretas
- [ ] Performance Lighthouse > 80

### 4.3 Segurança
- [ ] Senhas são hashidas (bcryptjs)
- [ ] JWTs têm expiração
- [ ] Rotas admin têm autenticação
- [ ] Inputs são sanitizados
- [ ] HTTPS está ativado
- [ ] Headers de segurança estão presentes

### 4.4 Dados
- [ ] Backup do banco implementado
- [ ] Migrations reversíveis criadas
- [ ] Índices de banco otimizados
- [ ] Arquivo .env.local está em .gitignore

---

## FASE 5: DEPLOYMENT NA VERCEL

### 5.1 Prepare o Git
```bash
git add .
git commit -m "Setup completo Banco Atlas"
git push origin main
```

### 5.2 Deploy no Vercel
1. Acesse https://vercel.com
2. Clique "New Project"
3. Selecione repositório "atlas-banco-digital"
4. Configure variáveis de ambiente:
   - DATABASE_URL
   - JWT_SECRET
   - NEXT_PUBLIC_API_URL (https://seu-dominio.com)
5. Deploy!

### 5.3 Configure Banco em Produção
```bash
# Vá para Vercel Dashboard
# Integre com Vercel Postgres OU
# Use Neon.tech / Supabase para PostgreSQL

# Após integração:
vercel env pull .env.production.local
npx prisma migrate deploy --skip-generate
```

### 5.4 Teste em Produção
- Acesse seu domínio
- Teste formulário de lead
- Teste login admin
- Monitore logs no Vercel

---

## FASE 6: MONITORAMENTO EM PRODUÇÃO

### 6.1 Logs
- Vercel Console (https://vercel.com/dashboard)
- Sentry para error tracking (opcional)

### 6.2 Métricas
- Performance: Lighthouse
- Uptime: StatusPage.io
- Analytics: Google Analytics

### 6.3 Backups
```bash
# Backup diário do banco
# Configure em Vercel ou use scripts
pg_dump $DATABASE_URL > backup.sql
```

---

## RESUMO TÉCNICO FINAL

| Componente | Tecnologia | Status |
|-----------|-----------|--------|
| Frontend | Next.js 14, React 18, Tailwind | ✓ Pronto |
| Backend | Next.js API Routes | ✓ Pronto |
| Banco | PostgreSQL, Prisma | ✓ Pronto |
| Auth | JWT + bcryptjs | ✓ Pronto |
| Validação | React Hook Form | ✓ Pronto |
| Deploy | Vercel | ✓ Pronto |
| SEO | Next.js Metadata | ✓ Pronto |
| Design | Responsivo Mobile-first | ✓ Pronto |

---

## PRÓXIMOS PASSOS (Versão 1.0)

1. **Adicionar Testes Automatizados**
   - Jest para unit tests
   - Playwright para E2E tests

2. **Implementar Analytics**
   - Google Analytics 4
   - Custom events para conversão de leads

3. **Melhorias de Performance**
   - Image optimization
   - Code splitting automático
   - Cache strategy

4. **Segurança Avançada**
   - 2FA para admin
   - Rate limiting
   - WAF (Web Application Firewall)

5. **Escalabilidade**
   - CDN para assets
   - Database replication
   - Load balancing

---

**Versão**: 0.1.0
**Data**: Dezembro 2025
**Autor**: Equipe de Desenvolvimento
