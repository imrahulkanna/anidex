import Queue from "./queue";

class RateLimiter {
    constructor(limit, interval) {
        this.queue = new Queue();
        this.limit = limit;
        this.interval = interval;
        this.activeJobs = 0;
        this.jobsCount = 0;
    }

    async processQueue() {
        if (this.queue.isQueueEmpty()) return;
        if (this.activeJobs < this.limit) {
            this.jobsCount++;
            this.activeJobs++;
            // console.log("inside processQueue");
            // console.log("job added", this.activeJobs);
            const { func, resolve, reject } = this.queue.dequeue();
            try {
                const result = await func();
                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
                this.activeJobs--;
                // console.log("job completed", this.activeJobs);
                // console.log("jobs Count", this.jobsCount);
                setTimeout(() => {
                    this.processQueue();
                }, this.interval / this.limit);
            }
        }
    }

    addJob(func) {
        // console.log("inside addJob");
        return new Promise((resolve, reject) => {
            this.queue.enqueue({ func, resolve, reject });
            this.processQueue();
        });
    }
}

export default RateLimiter;
