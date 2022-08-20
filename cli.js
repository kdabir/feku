#!/usr/bin/env node

import meow from 'meow';
import {generate} from "./index.js";
import {printError} from "./lib/utils.js";


const prgName = "$ feku";

const {input, flags, showVersion, showHelp} = meow(`
    Usage:
       ${prgName} <module> [opts...]

    Options:
         --help     -h              Show this help
         --version  -v              Show version
         --count    -n   <Number>   Number of rows to generate
         --array    -a              generate JSON array instead of NDJSON
         --seed          <Number>   Input Seed for random generators (faker, chance)
        
    Examples: 
       ${prgName} examples/movies.js --count 10 --seed foo

`, {
    importMeta: import.meta,
    flags: {
        version: {
            alias: 'v',
        },
        help: {
            alias: 'h',
        },
        array: {
            alias: 'a',
            type: 'boolean',
            default: false
        },
        count: {
            alias: 'n',
            type: 'number',
            default: 10
        },
        seed: {
            alias: 's',
            type: 'number',
        }
    }
});

flags.version && showVersion();
flags.help && showHelp();

// first arg should be module, ignore rest
const [module] = input;

if (!module) {
    printError('Please specify a module (.js file) to run')
}

const {
    default: rowBuilder,
    initialContext: initialContext,
} = await import( process.cwd() + "/" + module);


const {count = 10, array} = flags

// avoid generating larger data in eager mode.
const MAX_ITEMS_SUPPORTED_IN_ARRAY = 100;
if (array && count > MAX_ITEMS_SUPPORTED_IN_ARRAY) {
    printError("items more than 100 is not supported in array mode")
}

const out = []

for (let row of generate({...initialContext, ...flags}, rowBuilder)) {
    if (array) {
        out.push(row)
    } else {
        console.log(JSON.stringify(row))
    }
}

if (array && out.length) {
    console.log(JSON.stringify(out, null, 2))
}
