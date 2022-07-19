#!/usr/bin/env node

import minimist from 'minimist';
import {generate} from "./index.js";
import {printError, printHelp, printVersion} from "./lib/utils.js";


const opts = minimist(process.argv.slice(2), {
    string: [],
    boolean: ['help', 'version', 'array'],
    alias: {
        h: 'help',
        v: 'version',
        n: 'count',
        a: 'array'
    }
});

// console.log(opts)

if (opts.v) {
    printVersion()
}

if (opts.h) {
    printHelp()
}

// first arg should be module, ignore rest
const [module] = opts._

if (!module) {
    printError('Please specify a module (.js file) to run')
}

const {
    default: rowBuilder,
    initialContext: initialContext,
} = await import( process.cwd() + "/" + module);


const {count = 10, array} = opts

// avoid generating larger data in eager mode.
if (array && count > 100) {
    printError("items more than 100 is not supported in array mode")
}

const out = []

for (let row of generate({...initialContext, ...opts}, rowBuilder)) {
    if (array) {
        out.push(row)
    } else {
        console.log(JSON.stringify(row))
    }
}

if (array && out.length) {
    console.log(JSON.stringify(out, null, 2))
}
