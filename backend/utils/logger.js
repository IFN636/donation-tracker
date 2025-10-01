class Logger {
    constructor() {
        if (Logger.instance) return Logger.instance;
        this.prefix = "[DonationApp]";
        Logger.instance = this;
    }

    info(message) {
        console.log(`\x1b[32m${this.prefix} INFO:\x1b[0m ${message}`);
    }

    warn(message) {
        console.warn(`\x1b[33m${this.prefix} WARN:\x1b[0m ${message}`);
    }

    error(message) {
        console.error(`\x1b[31m${this.prefix} ERROR:\x1b[0m ${message}`);
    }
}

export default new Logger();