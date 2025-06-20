[![npm version](https://badge.fury.io/js/@hayata-yamamoto%2Fpromise-observers.svg)](https://badge.fury.io/js/@hayata-yamamoto%2Fpromise-observers)

# promise-observers

A TypeScript library for monitoring and capturing promise execution results with timing information. Perfect for performance monitoring, debugging, and analytics of asynchronous operations.

## Features

- 🕐 **Timing Capture**: Automatically measure promise execution time
- 📊 **Multiple Observers**: Built-in observers for console, file, and memory storage
- 🔍 **Success/Failure Tracking**: Monitor both fulfilled and rejected promises
- 🎯 **Non-intrusive**: Works with existing Promise.all patterns
- 📝 **TypeScript**: Full type safety and IntelliSense support

## Installation

```bash
npm install @hayata-yamamoto/promise-observers
```

## Quick Start

```typescript
import { promiseAllWithObservers } from '@hayata-yamamoto/promise-observers';
import { consoleObserver } from '@hayata-yamamoto/promise-observers/observers';

// Define your promises with keys for identification
const promises = [
  { key: 'fetch-user', fn: () => fetchUser(123) },
  { key: 'fetch-posts', fn: () => fetchUserPosts(123) },
  { key: 'fetch-comments', fn: () => fetchComments(456) }
];

// Execute with observers
const results = await promiseAllWithObservers(promises, [
  consoleObserver() // Logs timing info to console
]);
```

## Built-in Observers

### Console Observer
Logs execution results and timing to the console:

```typescript
import { consoleObserver } from '@hayata-yamamoto/promise-observers/observers';

const observer = consoleObserver();
// Output: "Fulfilled: fetch-user in 245ms"
// Output: "Rejected: fetch-posts in 1200ms"
```

### JSON File Observer
Writes results to a JSON file (one result per line):

```typescript
import { jsonFileObserver } from '@hayata-yamamoto/promise-observers/observers';

const observer = jsonFileObserver({ fileName: 'results.json' });
// Creates/appends to results.json with timing data
```

### Store Object Observer
Stores results in memory for later processing:

```typescript
import { storeObjectObserver } from '@hayata-yamamoto/promise-observers/observers';

const results = [];
const observer = storeObjectObserver({ initialState: results });
// Results will be pushed to the results array
```

## Advanced Usage

### Multiple Observers
Use multiple observers simultaneously:

```typescript
const results = await promiseAllWithObservers(promises, [
  consoleObserver(),
  jsonFileObserver({ fileName: 'performance.json' }),
  storeObjectObserver({ initialState: metricsArray })
]);
```

### Custom Observers
Create your own observers by implementing the `ObserverType` interface:

```typescript
import { ObserverType, PromiseResult } from '@hayata-yamamoto/promise-observers';

const customObserver = (): ObserverType => ({
  onFullfilled: async (result: PromiseResult) => {
    // Handle successful promise
    console.log(`✅ ${result.key} completed in ${result.responseTime}ms`);
  },
  onRejected: async (result: PromiseResult) => {
    // Handle failed promise
    console.log(`❌ ${result.key} failed after ${result.responseTime}ms`);
  }
});
```

### Promise Result Structure
Each observer receives a `PromiseResult` object:

```typescript
type PromiseResult = {
  key: string;        // The identifier you provided
  responseTime: number; // Execution time in milliseconds
}
```

## Use Cases

- **Performance Monitoring**: Track API response times
- **Debugging**: Identify slow or failing operations
- **Analytics**: Collect metrics on async operations
- **Load Testing**: Monitor promise execution under load
- **Logging**: Centralized logging of async operations

## TypeScript Support

Full TypeScript support with complete type definitions:

```typescript
import { promiseAllWithObservers, ObserverType, PromiseResult } from '@hayata-yamamoto/promise-observers';
```

## Documentation

Full API documentation: https://hayata-yamamoto.github.io/promise-observers/

## Contributing

1. Search existing issues before creating new ones
2. Create an issue to discuss new features
3. Fork the repository and create a feature branch
4. Write tests for new functionality
5. Submit a pull request

## License

MIT
