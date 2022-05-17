import {faker} from "@faker-js/faker";

export const randomNumber = (min = 0, max = 99) => faker.datatype.number({min, max});
export const randomWords = (min = 0, max = 99) => faker.lorem.words(randomNumber(min, max));
export const oneOf = (...args) => faker.random.arrayElement(args);
export const name = () => faker.name.findName();
export const email = () => faker.internet.email();
export const phone = () => faker.phone.phoneNumber();
