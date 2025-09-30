import { EventEmitter } from "events";

const bus = new EventEmitter();

export const initEventSubscribers = () => {
    bus.on("DonationCreated", async (evt) => {
        console.log("DonationCreated", evt);
        // TODO: push email
    });

    bus.on("test", async (evt) => {
        console.log("Test", evt);
    });
};

export { bus };
