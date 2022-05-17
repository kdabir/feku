
export default function peopleRow({faker}) {
    return {
        name: faker.name.findName(),
        age: faker.datatype.number({min: 1, max: 100}),
    }
}

export const initialContext = {
    count: 30
}
