
const fs = require('fs');

class Logger {
    constructor(saveToFile, startDate) {
        this.saveToFile = saveToFile;
        this.startDate = startDate;
        if (saveToFile) {
            this.logsFolder = './logs/'
            if(!fs.existsSync(this.logsFolder)) {
                fs.mkdirSync(this.logsFolder);
            }
            this.file = './logs/logs.log'
            this.logStream = fs.createWriteStream(this.file, {flags: 'a'});
        }
    }
    info(text) {
        const date = new Date().toLocaleDateString('pt-Br');
        const hour = new Date().toLocaleTimeString('pt-Br');
        const log = `${date} - ${hour}: ${text}`;
        if(this.saveToFile) {
            this.#writeToFile(log);
        }
        return console.info(log);
    }
    warning(text) {
        const date = new Date().toLocaleDateString('pt-Br');
        const hour = new Date().toLocaleTimeString('pt-Br');
        const log = `${date} - ${hour}: ${text}`;
        if(this.saveToFile) {
            this.#writeToFile(log);
        }
        return console.warn(log);
    }
    error(text) {
        const date = new Date().toLocaleDateString('pt-Br');
        const hour = new Date().toLocaleTimeString('pt-Br');
        const log = `${date} - ${hour}: ${text}`;
        if(this.saveToFile) {
            this.#writeToFile(log);
        }
        return console.info(log);
    }
    #writeToFile(data) {
        this.logStream.write(`${data}\n`);
    }
}


const logger = new Logger(true);
logger.info("Oii");
logger.warning("WARNING");
setTimeout(() => {
    logger.error("ERROR");
}, 3000);