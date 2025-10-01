class NotificationStrategy {
    sendNotification(user, message) {
        throw new Error("This method should be overridden!");
    }
}

export class EmailNotificationStrategy extends NotificationStrategy {
    sendNotification(user, message) {
        console.log(`Sending email to ${user.email}: ${message}`);
    }
}

export class SMSNotificationStrategy extends NotificationStrategy {
    sendNotification(user, message) {
        console.log(`Sending SMS to ${user.phone}: ${message}`);
    }
}

export class NotificationService {
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    sendNotification(user, message) {
        return this.strategy.sendNotification(user, message);
    }
}
