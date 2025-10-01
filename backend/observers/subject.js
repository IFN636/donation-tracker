class Subject {
    constructor() {
        this.observers = {};
    }

    subscribe(eventType, fn) {
        if (!this.observers[eventType]) this.observers[eventType] = [];
        this.observers[eventType].push(fn);
    }

    notify(eventType, payload) {
        (this.observers[eventType] || []).forEach((fn) => fn(payload));
    }
}

export default new Subject();
