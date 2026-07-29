# Plano de Refatoração (Clean Code) — projeto discord-clone

Resumo
------
Este documento descreve um plano prático para aplicar melhorias de Clean Code no projeto `discord-clone`, começando pelas mudanças já propostas para o componente `ChannelList` e estendendo-as para todo o código onde os mesmos padrões aparecem.

Objetivos principais
-------------------
- Padronizar nomes de arquivos, componentes, props e hooks (PascalCase para componentes, camelCase para props, `use*` para hooks).
- Corrigir typos e inconsistências (ex.: `channelBuntton` → `ChannelButton`).
- Reduzir conflitos de estilo (ex.: `grid-area` duplicado) e melhorar a semântica dos styled-components.
- Melhorar legibilidade e manutenção sem alterar APIs do backend.

Escopo
------
- Frontend: toda a pasta `frontend/src` (componentes, hooks, styles, tipos/entidades).
- Backend: toda a pasta `discord-backend/` (controllers, useCases/services, repositories, types, Prisma schema, scripts de seed/migration).
- Ajustes mínimos em testes e imports para refletir renomeações.

Cobertura Backend (padrões a aplicar)
------------------------------------
- Padronizar nomes de arquivos e exports: PascalCase para classes/constructors, kebab/camelCase consistentes para arquivos utilitários.
- DTOs e tipos: usar nomes claros e centralizados (pasta `src/domain` ou `src/types`) e evitar `any`.
- Serviços/useCases: manter funções pequenas, com responsabilidade única; separar regras de negócio da camada de infraestrutura.
- Repositórios: definir interfaces claras e injetá-las nos serviços (facilita testes/mocks).
- Prisma / DB: validar schema.prisma para nomes coerentes e criar tipos compartilhados com o frontend quando aplicável.
- Erros e logging: normalizar objetos de erro e usar utilitários de logging centralizados.

Passos adicionais específicos ao backend
---------------------------------------
1. Mapear arquivos backend que usam convenções inconsistentes (ex.: nomes de classes, serviços sem sufixos, handlers sem testes).
2. Renomear tipos/DTOs para camelCase/capitalização conforme padrão adotado no projeto.
3. Extrair e centralizar tipos compartilhados em `discord-backend/src/types` e, se necessário, criar um pacote local (monorepo) ou arquivos de sincronização com o frontend.
4. Revisar `prisma/schema.prisma` para naming conventions e gerar client (`npx prisma generate`) e migrar se necessário.
5. Ajustar imports/exports em controllers, routes e testes; rodar `tsc`/build do backend para capturar erros.
6. Rodar testes de integração/unitários do backend e validar endpoints principais (ex.: getAll channels, autenticação básica se houver).

Verificação (Backend)
---------------------
1. No diretório `discord-backend`:

```bash
# instalar dependências
npm install

# checar tipos/compilação
npm run build

# rodar testes
npm test

# iniciar em dev
npm run dev
```

2. Validar endpoints principais manualmente (Postman/Insomnia ou curl).

Observação
---------
Ao aplicar mudanças em ambos frontend e backend, priorize commits separados por domínio (frontend/backend) para facilitar revisão.

Passos detalhados
-----------------
1. Buscar ocorrências e mapear mudanças
   - Procurar por strings e símbolos a serem normalizados: `ChannelName`, `channelBuntton`, `ChannelListHooks`, `*Buntton*`, `grid-area: CL`, etc.
   - Gerar uma lista de arquivos afetados e dependências (imports/exports).

2. Renomeações (arquivos e exports)
   - Padronizar nomes de arquivos e components para PascalCase, por exemplo:
     - `channelBunttonServer.tsx` → `ChannelButtonServer.tsx`
     - `channelListServer.tsx` → manter `ChannelList.tsx` ou `ChannelListServer.tsx` (consistência)
   - Atualizar exports default/named conforme necessário.

3. Hooks
   - Renomear hooks que não seguem convenção para `use*` (ex.: `ChannelListHooks` → `useChannelList`).
   - Garantir que hooks retornem um contrato claro (ex.: `{ loading, data, error, refresh? }`).

4. Props e tipos
   - Padronizar props em camelCase (ex.: `channelName: string`).
   - Atualizar interfaces em `entity/*` para refletir as mudanças e exportá-las onde necessário.

5. Styled-components
   - Revisar componentes estilizados que podem conflitar (ex.: `grid-area: CL` presente em wrappers e itens). Remover ou ajustar para evitar sobreposição.
   - Verificar duplicidade de nomes de `Container` em diferentes arquivos e, quando apropriado, renomear para `XyzContainer` para clareza.

6. Corrigir imports em todo o projeto
   - Atualizar caminhos relativos e imports após renomeações.
   - Rodar TypeScript para identificar imports quebrados e corrigi-los.

7. Testes e verificação
   - Rodar lint e build do frontend + backend (quando aplicável).
   - Executar testes unitários existentes e validar manualmente a UI em `dev`.

8. Commit / PR
   - Fazer commits pequenos e atômicos por grupo de mudanças (ex.: "refactor(channel): rename ChannelButton and props").
   - Abrir PR com descrição das intenções, lista de arquivos alterados e instruções de validação.

Comandos úteis para verificação
-------------------------------
No diretório `frontend`:

```bash
# instalar dependências (se necessário)
npm install
# ou pnpm install

# rodar lint
npm run lint

# build (TypeScript checks)
npm run build

# rodar testes
npm test

# iniciar modo dev (vite)
npm run dev
```

Critérios de aceite
-------------------
- Build TypeScript do frontend completa sem erros.
- Lint com número aceitável de avisos (ou zero, preferível).
- Aplicação roda em `dev` e os casos de `loading` / `empty` / renderização de canais funcionam.
- Mudanças estão documentadas e agrupadas em commits claros para revisão.

Observações e recomendações
--------------------------
- Preferir não alterar contratos de API (backend) durante a refatoração; foque em frontend.
- Manter PRs pequenos para facilitar revisão.
- Considere adicionar testes unitários básicos para componentes críticos (lista de canais, botão de canal).

Próximos passos sugeridos
------------------------
- Confirmar se deseja que eu aplique as mudanças automaticamente em todo o repositório (criar commits/patches), ou se prefere que eu gere um patch/PR para revisão manual.
- Se aprovar a aplicação automática, eu implemento as renomeações e atualizo imports, em seguida executo build/lint localmente e reporto resultados.

--
Plano gerado e salvo pelo assistente — pronto para aplicar.
