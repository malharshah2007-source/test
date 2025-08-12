# FitBuddy - Workout Partner Matching App

## Overview

FitBuddy is a full-stack web application designed to connect fitness enthusiasts with potential workout partners. The app enables users to discover, match, and communicate with like-minded individuals based on workout preferences, location, and fitness goals. It features a swipe-based matching interface, real-time messaging, and user profile management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color scheme for fitness branding (orange, vibrant blue, energetic green)
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development**: Hot reload with Vite in development mode

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database
- **Schema**: Shared TypeScript schema definitions between client and server
- **Validation**: Zod schemas for runtime type validation
- **Migrations**: Drizzle Kit for database schema management

### Core Data Models
- **Users**: Profile information, workout preferences, location, online status
- **Matches**: Connection requests between users with status tracking
- **Messages**: Chat functionality between matched users

### Authentication & Session Management
- Session-based authentication using connect-pg-simple for PostgreSQL session storage
- User online status tracking with last seen timestamps

### Storage Strategy
- In-memory storage implementation for development (MemStorage class)
- Database abstraction layer (IStorage interface) for easy switching between storage backends
- Sample data initialization for development and testing

### UI/UX Design Patterns
- Mobile-first responsive design with desktop navigation
- Card-based user interface for profile discovery
- Swipe-like interaction patterns for matching
- Real-time status indicators (online/offline)
- Toast notifications for user feedback

### Development Workflow
- TypeScript strict mode for type safety
- Path aliases for clean imports (@/, @shared/, @assets/)
- Development server with error overlay and debugging tools
- Build process optimized for both client and server deployment

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, React DOM, React Router (Wouter)
- **Build Tools**: Vite with React plugin, esbuild for server bundling
- **Development**: tsx for TypeScript execution, Replit integration plugins

### UI Component Library
- **shadcn/ui**: Complete UI component system built on Radix UI
- **Radix UI**: Headless component primitives for accessibility
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React icon library

### Data Management
- **Database**: Neon Database (serverless PostgreSQL), connect-pg-simple for sessions
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for schema validation, drizzle-zod for schema generation
- **HTTP Client**: TanStack Query for server state management

### Utility Libraries
- **Date Handling**: date-fns for date manipulation
- **Styling Utilities**: clsx, class-variance-authority for conditional classes
- **UI Enhancements**: cmdk for command palette, embla-carousel for carousels
- **Form Management**: React Hook Form with Hookform resolvers

### Development & Deployment
- **Replit Platform**: Custom plugins for development environment integration
- **Error Handling**: Runtime error modal for development debugging
- **Font Loading**: Google Fonts integration (Inter, DM Sans, Fira Code, Geist Mono)

### API & Communication
- RESTful API design with Express.js middleware
- JSON-based request/response handling with proper error responses
- CORS and security headers for production deployment