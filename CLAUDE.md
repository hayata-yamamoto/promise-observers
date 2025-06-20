# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Build**: `npm run build` - Compiles TypeScript to JavaScript in dist/ folder
- **Lint**: `npm run lint` or `eslint --fix --ext .ts src` - Lints and auto-fixes TypeScript files
- **Format**: `npm run format` - Runs prettier and eslint formatting in sequence
- **Documentation**: `npm run build:doc` - Generates markdown docs from JSDoc comments

## Project Architecture

This is a TypeScript npm package that provides **promise observers** - a pattern for capturing and monitoring promise execution results asynchronously.

### Core Architecture

The package implements an **Observer pattern** for monitoring promise execution:

1. **Observable** (`src/index.ts`): Central notification system that manages observers and notifies them of promise results
2. **Observers** (`src/observers/`): Implement `ObserverType` interface with `onFullfilled` and `onRejected` handlers
3. **Main Function** (`promiseAllWithObservers`): Wraps Promise.all to capture timing and execution results

### Key Components

- **`src/index.ts`**: Main entry point with `promiseAllWithObservers` function and observable factory
- **`src/types.ts`**: Core types (`PromiseResult`, `ObservableType`)
- **`src/observers/`**: Built-in observer implementations
  - `types.ts`: Observer interface definition
  - `consoleObserver.ts`: Logs results to console
  - `jsonFileObserver.ts`: Writes results to JSON file
  - `storeObjectObserver.ts`: Stores results in memory

### Usage Pattern

The package captures timing and success/failure data for promises by:
1. Creating an observable instance
2. Registering observers for monitoring
3. Wrapping promises with timing capture
4. Notifying observers of results (fulfilled/rejected with timing data)

### Code Style

- Uses `type` definitions instead of interfaces (enforced by ESLint rule)
- Strict TypeScript configuration with declaration generation
- Standard TypeScript ESLint configuration
- Prettier for code formatting