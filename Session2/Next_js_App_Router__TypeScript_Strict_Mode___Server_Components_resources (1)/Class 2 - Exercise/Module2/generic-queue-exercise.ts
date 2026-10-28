// Exercise: implement a generic Queue<T> (FIFO).
// Fill in the TODOs below so the demo at the bottom prints the
// "expected" values.
//
// Check your work:
//   npx tsc --strict --noEmit generic-queue-exercise.ts
//   node 04-generic-queue-exercise.ts

class Queue<T> {
  private head = 0;
  private tail = 0;
  private items: Record<number, T> = {};

  // Add an item to the back
  enqueue(element: T): void {
    // TODO
  }

  // Remove and return the front item
  dequeue(): T | undefined {
    // TODO
    return undefined;
  }

  // View the front item without removing it
  peek(): T | undefined {
    // TODO
    return undefined;
  }

  // Get current size
  get size(): number {
    // TODO
    return 0;
  }

  // Check if empty
  isEmpty(): boolean {
    // TODO
    return true;
  }
}

// Usage Example:
const myQueue = new Queue<number>();
myQueue.enqueue(10);
myQueue.enqueue(20);
console.log(myQueue.dequeue()); // expected: 10
console.log(myQueue.peek()); // expected: 20
