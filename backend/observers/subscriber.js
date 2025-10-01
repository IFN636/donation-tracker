export function subscribeToEvent(subject, eventType, fn) {
    subject.subscribe(eventType, fn);
}

export function initEventSubscribers(subject) {
    // Example subscription
    subscribeToEvent(subject, "DONATION_CREATED", (data) => {
        console.log("Global event triggered", data);
    });
}
