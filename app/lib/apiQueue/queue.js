class Queue {
    constructor() {
        this.jobs = [];
    }

    enqueue(job) {
        this.jobs.push(job);
    }

    dequeue() {
        return this.jobs.shift();
    }

    isQueueEmpty() {
        return this.jobs.length === 0;
    }
}

export default Queue;
