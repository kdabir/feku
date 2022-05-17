import {readFileSync} from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';


export function printVersion () {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const version = JSON.parse(readFileSync(__dirname + '/package.json', {encoding:'utf8'})).version
    console.log(`feku ${version}`)
    process.exit(0)
}

export function printHelp() {
    console.log("feku <module> [opts...]")
    process.exit(0)
}

export function printError(message, code=1) {
    console.error(message)
    process.exit(code)
}
