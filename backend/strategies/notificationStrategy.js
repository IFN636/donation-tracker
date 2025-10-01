export class EmailNotificationStrategy {
    sendNotification(user, message) {
        console.log(`Sending email to ${user.email}: ${message}`);
    }
}

export class SMSNotificationStrategy {
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