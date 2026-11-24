# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4 + React 19 + TypeScript project using the App Router. The project is configured for standalone output (Docker deployment) and integrates with Mastra AI framework for agent-based functionality.

## Development Commands

```bash
# Development
npm run dev                  # Start development server at localhost:3000

# Build
npm run build               # Production build
npm run build:dev           # Development build (with NODE_ENV=development)
npm run build:prod          # Production build (with NODE_ENV=production)

# Production
npm start                   # Start production server

# Linting
npm run lint               # Run ESLint
```

## Architecture

### Directory Structure

- **src/app/** - Next.js App Router pages and API routes
  - `app/components/` - Shared React components (Header, Footer, Modals, etc.)
  - `app/lib/` - Utility functions and shared logic
  - `app/api/` - API layer (axios configuration, API clients)
  - `app/example/` - Example pages and demonstrations

- **src/mastra/** - Mastra AI agent framework integration
  - `agents/` - AI agent definitions (e.g., weather-agent.ts)
  - `tools/` - Agent tools (e.g., weather-tool.ts)
  - `workflows/` - Agent workflows
  - `index.ts` - Main Mastra instance configuration with LibSQLStore and PinoLogger

- **src/hooks/** - Custom React hooks
  - `useToggle.ts` - Toggle state management
  - `useOutsideClick.ts` - Detect clicks outside elements
  - Exported via `index.ts` barrel file

- **src/constants/** - Application constants and configuration

### Key Architectural Patterns

**Mastra AI Integration:**
- Main Mastra instance is configured in `src/mastra/index.ts` with storage (LibSQLStore) and logging (PinoLogger)
- Agents are defined separately in `src/mastra/agents/` and registered with Mastra
- Agents use OpenAI models (gpt-4o-mini) and can have tools, memory, and workflows
- Weather agent example demonstrates tool usage, memory persistence, and structured instructions
- There's a duplicate mastra.ts file in `src/app/lib/` which may need consolidation

**API Layer:**
- Axios instance configured in `src/app/api/axios.ts` with:
  - Base URL from `NEXT_PUBLIC_API_URL` environment variable
  - Automatic Bearer token injection from localStorage
  - Request/response interceptors for auth and error handling
  - 5000ms timeout

**Modal System:**
- Uses React Context pattern (`ModalContext` in `src/app/components/ModalProvider.tsx`)
- Provides Promise-based modal API for async confirmations
- Components: CommonModal, ConfirmModal

**Styling:**
- Tailwind CSS v4 with PostCSS
- SCSS/Sass support enabled
- Geist font family (Sans and Mono) configured globally

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Target: ES2017
- Strict mode enabled
- Module resolution: bundler

### Image Configuration

Next.js is configured to allow images from these external domains:
- `26.media.tumblr.com`
- `cdn2.thecatapi.com`
- `cdn2.thedogapi.com`
- `media.tumblr.com`

## Project Goals (from projectGuideline.md)

This is a personal crib/playground project focused on:
- **UI:** Minimal but clean design with header/footer layout, drag-and-drop widgets
- **AI Integration:** MCP AI Agent on main landing, OpenAPI integrations
- **Features:** Weather, stocks/exchange rates, news, GitHub info, API collections, maps, parking finder, CRUD memo functionality with pagination, Notion/Slack MCP integration, markdown editor/viewer
- **Auth:** OAuth, token-based authentication, proper use of localStorage/sessionStorage/cookies
- **Advanced UI:** Infinite scroll, scroll position memory for navigation

## Docker Support

- Dockerfile present for containerization
- Next.js configured with `output: "standalone"` for optimized Docker builds
- Documentation in `docs/Docker.md`, `docs/Dockerfile_multiStageBuild`, `docs/Dockerfile_standalone`

## Important Notes

- The project uses React 19 and Next.js 15.4, which may have breaking changes from previous versions
- Main branch is `main`, development on `develop` branch
- Korean comments/documentation present throughout the codebase
- The axios interceptor assumes localStorage availability (client-side only)
