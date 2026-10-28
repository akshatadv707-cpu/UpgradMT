

class Queues<T>{

    private head=0;
    private tail=0;
    private items:Record<number,T>={};

    enqueue(elements:T): void{
        this.items[this.tail]=elements;
        this.tail++

    }
    dequeue(): T | undefined{
        if(this.isEmpty()) return undefined;
        const item=this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return item;
    }

    peek(): T | undefined{
        if(this.isEmpty()) return undefined;
        
        return this.items[this.head];
    }

    isEmpty():boolean{
        return this.size===0;
    }

    get size():number{
        return this.tail-this.head;
    }

}

const myQueues= new Queues<number>();
myQueues.enqueue(10);
myQueues.enqueue(20);
//console.log(myQueues.dequeue());
console.log(myQueues.size);
console.log(myQueues.peek());


