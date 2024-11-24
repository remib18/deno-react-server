# 🤝 Contributing to Deno React Server

Thank you for your interest in contributing to Deno React Server! This guide will help you get started with contributing to the project.

## 📋 Prerequisites

- [Deno](https://deno.land/) (latest version)
- Basic knowledge of TypeScript and React
- Familiarity with server-side rendering concepts
- Git installed on your machine

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/remib18/deno-react-server.git
cd deno-react-server
```

3. Create a new branch for your changes:

```bash
git checkout -b feat/your-feature-name
```

4. Start the development server:

```bash
deno task dev
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code formatting
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Middleware Development

When creating new middleware, follow the existing pattern:

```typescript:core/server.ts
startLine: 78
endLine:81
```

### Logging

Use the built-in Logger for consistency:

```typescript:core/logger.ts```


## 🧪 Testing

1. Write tests for new features
2. Ensure existing tests pass
3. Test both success and error cases
4. Include edge cases in your tests

## 📦 Submitting Changes

1. Update relevant documentation
2. Commit your changes:

```bash
git commit -m "feat: your feature description"
```

3. Push your changes:

```bash
git push origin feat/your-feature-name
```

4. Create a Pull Request

### Commit Message Format

Follow the conventional commits specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 🗺️ Finding Issues to Work On

Check our [Roadmap](./ROADMAP.md) and the issues tab for:

- Issues labeled `good-first-issue`
- Current milestone tasks
- Bug fixes needed
- Documentation improvements

## 🔍 Code Review Process

1. All PRs require at least one review
2. Address review feedback promptly
3. Keep PRs focused and reasonably sized
4. Include tests and documentation updates

## 🚨 Reporting Bugs

When reporting bugs, include:

- Deno version
- Steps to reproduce
- Expected vs actual behavior
- Relevant error messages
- Code samples if applicable

## 💡 Feature Requests

When proposing features:

1. Check if it aligns with the project roadmap
2. Describe the use case
3. Outline expected behavior
4. Consider implementation complexity

## 📚 Documentation

- Update README.md for significant changes
- Add JSDoc comments for new APIs
- Update ROADMAP.md for new features
- Keep code examples current

## ❓ Getting Help

- Create an issue for questions
- Join our community discussions
- Check existing documentation
- Review closed issues for similar problems

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Deno React Server! 🎉