const path = require('path');
const fs = require('fs');


class Logger {
    constructor() {
        this.filename = null;
        this.module = null;
        this.logsFolder = './logs'
        this.#createLogsDir();
        this.loggingLevel = 'INFO'
        this.file = 'logs.log';
        this.logStream = fs.createWriteStream(`${this.logsFolder}/${this.file}`, {flags: 'a'});
    }
    info(text) {
        const date = new Date().toLocaleDateString('pt-Br');
        const hour = new Date().toLocaleTimeString('pt-Br');
        const log = `${date} - ${hour}: ${text}`;
        this.#writeToFile(log);
        return console.info(log);
    }
    warning(text) {
        const date = new Date().toLocaleDateString('pt-Br');
        const hour = new Date().toLocaleTimeString('pt-Br');
        const log = `${date} - ${hour}: ${text}`;
        this.#writeToFile(log);
        return console.warn(log);
    }
    error(text) {
        const date = new Date().toLocaleDateString('pt-Br');
        const hour = new Date().toLocaleTimeString('pt-Br');
        const log = `${date} - ${hour}: ${text}`;
        this.#writeToFile(log);
        return console.info(log);
    }
    getLogger(moduleName) {
        return new Logger()
    }
    basicConfig(filename, level) {
        const splitedFilename = filename.split("/");
        if(splitedFilename.length > 1) {
            this.logsFolder = splitedFilename.at(0);
            console.log(this.logsFolder);
        } else {
            this.file = splitedFilename.at(0);
        }
        this.#createLogsDir();
        this.logStream = fs.createWriteStream(`${this.logsFolder}/${this.file}`, {flags: 'a'});
    }
    #writeToFile(data) {
        this.logStream.write(`${data}\n`);
    }
    #createLogsDir() {
        if(!fs.existsSync(this.logsFolder)) {
            fs.mkdirSync(this.logsFolder);
        }
    }
}


//TODO: implement logging level when saving to file

const logger = new Logger();
logger.basicConfig(filename='2newLog.log', 'INFO');
logger.info("Oii");
logger.warning("WARNING");
setTimeout(() => {
    logger.error("ERROR");
}, 3000);