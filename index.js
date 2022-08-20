import {faker} from '@faker-js/faker';
import {Chance} from 'chance';
import * as fn from './lib/index.js';


/**
 *
 * using as generator function
 *     for (let row of generate(context, rowBuilder)) {...}
 *
 * using as callback
 *      generate(context, rowBuilder, (row)=> console.log(row))
 *
 *
 * context:
 *  - count
 *  - index
 *  - seed
 *  - stop: boolean
 *
 * @param context {Object}
 * @param rowBuilder (context) => {}:
 * @param cb? optional callback, cb is called for each item and function doesn't return anything
 *
 * @return {*[]} array of rows or undefined if callback is provided
 */

export function* generate(context = {}, rowBuilder, cb = null) {
    context.count = context.count || 10
    context.index = 0
    context.fn = fn

    const shouldCallback = (typeof cb === 'function')

    faker.seed(context.seed);
    const chance = new Chance(context.seed);

    context = {...context, ...{faker, chance}};

    while (context.index < context.count && !context.stop) {
        const row = rowBuilder(context);

        if (shouldCallback) {
            cb(row);
        } else {
            yield row;
        }

        context.index++;
        context.prev = row;
    }
}

