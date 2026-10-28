class Queue<T> {
  private head = 0;
  private tail = 0;
  private items: Record<number, T> = {};

  // Add an item to the back
  enqueue(element: T): void {
    this.items[this.tail] = element;
    this.tail++;
  }

  // Remove and return the front item
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  // View the front item without removing it
  peek(): T | undefined {
    if(this.isEmpty()) return undefined;
    return this.items[this.head];
  }

  // Get current size
  get size(): number {
    return this.tail - this.head;
  }

  // Check if empty
  isEmpty(): boolean {
    return this.size === 0;
  }
}

// Usage Example:
const myQueue = new Queue<number>();
myQueue.enqueue(10);
myQueue.enqueue(20);
console.log(myQueue.dequeue()); // expected: 10
console.log(myQueue.peek());    // expected: 20
