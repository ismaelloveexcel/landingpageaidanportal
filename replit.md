# replit.md

## Overview

This is a kid-friendly app portal landing page designed with a gaming-platform aesthetic inspired by Roblox and Fortnite. The application serves as a personalized collection hub where users can browse and launch various apps/games through an engaging, vibrant interface. The project uses a full-stack TypeScript architecture with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom gaming-themed dark color palette
- **Animations**: Framer Motion for interactive animations
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Utility functions in `client/src/lib/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **HTTP Server**: Node.js native HTTP server wrapping Express
- **API Pattern**: RESTful JSON API with `/api/` prefix
- **Development Server**: Vite middleware integration for HMR

The server structure:
- `server/index.ts` - Entry point and middleware setup
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Data access layer with storage interface
- `server/vite.ts` - Development server with Vite integration
- `server/static.ts` - Production static file serving

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle table definitions
- **Validation**: Zod schemas auto-generated from Drizzle schemas via drizzle-zod
- **Current Implementation**: In-memory storage (`MemStorage` class) with seeded sample data
- **Database Ready**: PostgreSQL configuration in place via `drizzle.config.ts`

Data models:
- `users` - Basic user authentication (id, username, password)
- `apps` - App entries with title, description, URL, icon, color, and display order

### Design System
- **Typography**: Fredoka (primary gaming font), Inter (secondary), Oxanium (monospace)
- **Theme**: Dark gaming portal aesthetic with vibrant neon colors (purple, cyan, green accents)
- **Components**: Fully themed shadcn/ui components with custom CSS variables
- **Responsive**: Mobile-first design with Tailwind breakpoints

## External Dependencies

### Core Libraries
- **@tanstack/react-query**: Server state management and data fetching
- **drizzle-orm**: Type-safe SQL ORM for database operations
- **express**: Web server framework
- **zod**: Runtime type validation

### UI Framework
- **@radix-ui/***: Unstyled, accessible UI primitives (dialog, dropdown, tabs, etc.)
- **class-variance-authority**: Component variant management
- **tailwindcss**: Utility-first CSS framework
- **framer-motion**: Animation library

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **connect-pg-simple**: Session storage for PostgreSQL (available but not currently used)

### Development Tools
- **Vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **drizzle-kit**: Database migration and schema management

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner