# 📁 Project Structure

This document provides a detailed overview of the Deno React Server project structure.

## 🌳 Directory Tree

```
/project-root
├── /core                # Core server functionality
├── /config              # Configuration files
├── /modules             # Plugin modules
├── /ui                  # React components and hooks
├── /public              # Static assets
└── /tests               # Test suites
```

## 📂 Detailed Structure

### `/core` - Core Server Functionality
- `logger.ts` - Logging utility

#### `/server`
- `main.ts` - Application entry point
- `server.ts` - Main Deno server setup and request handling
- `router.ts` - Custom routing implementation
- `helpers.ts` - Server utility functions
- `react-compiler.ts` - React SSR compilation logic
- `caching.ts` - Server-side caching mechanisms
- `middleware.ts` - Core middleware implementations

#### `/internationalization`
- `i18n.ts` - Translation and locale management
- `routes.ts` - Locale-aware routing system

#### `/migrations`
- `migrate.ts` - Database migration engine
- `helpers.ts` - Migration utility functions

#### `/auth`
- `auth.ts` - Authentication core logic
- `strategies.ts` - Authentication strategy implementations

### `/config` - Configuration Files

- `default-config.ts` - Default application settings
- `migration-config.ts` - Database migration settings
- `auth-config.ts` - Authentication configuration
- `modules-config.ts` - Plugin/module management

### `/modules` - Plugin System

Each module follows this structure:
```
/module-name
├── /translations        # Locale files
├── /pages              # Module-specific pages
├── /api                # API endpoints
├── /middlewares        # Custom middlewares
├── /migrations         # Database migrations
└── config.ts           # Module configuration
```

### `/ui` - Frontend Components

- `/components` - Reusable React components
- `/hooks` - Custom React hooks
- `/styles` - Global styles and themes
- `/utils` - Frontend utilities

### `/public` - Static Assets

- `/assets` - Images, fonts, and other media
- `/scripts` - Client-side JavaScript

### `/tests` - Testing

Contains test suites organized by feature/module

## 📄 Root Files

- `deno.json` - Deno configuration
- `deps.ts` - Centralized dependencies
- `import_map.json` - Module aliases
- `README.md` - Project documentation
- `LICENSE` - License information

## 🔍 Key Concepts

### Modularity
- Each module is self-contained
- Modules can be enabled/disabled via configuration
- Clear separation between core and plugin functionality

### Configuration
- Hierarchical configuration system
- Environment-specific settings
- Module-level configuration

### Internationalization
- Built-in i18n support
- Locale-specific routing
- Translation management

### Testing
- Organized by feature
- Separate test environments
- Comprehensive coverage

## 📝 Development Guidelines

1. **Core Updates**
   - Keep core modules minimal and focused
   - Document all public APIs
   - Include tests for new functionality

2. **Module Development**
   - Follow the standard module structure
   - Include necessary translations
   - Provide module documentation

3. **UI Components**
   - Use TypeScript for all components
   - Follow React best practices
   - Include component documentation

4. **Testing**
   - Write tests for new features
   - Maintain existing test coverage
   - Test both success and error cases

## 🔗 Related Documentation

- [Contributing Guide](./CONTRIBUTING.md)
- [Roadmap](./ROADMAP.md)

## 📚 Notes

- All paths are relative to the project root
- Module names should be kebab-case
- Follow TypeScript naming conventions
- Keep documentation up to date
