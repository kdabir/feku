
export default function movieRow({faker, fn:{oneOf, randomNumber, randomWords}}) {
    return {
        title: randomWords(1,5),
        year: faker.datatype.number({min: 1970, max: 2022}),
        rating: faker.datatype.number({min: 1, max: 5}),
        duration: randomNumber(90, 180),
        genre: oneOf('Action', 'Comedy', 'Horror', 'Drama', "Romance", "Thriller", "Science Fiction"),
        image: faker.image.image(),
        description: faker.lorem.sentences(),
        cast: [
            faker.name.findName(),
            faker.name.findName(),
            faker.name.firstName()
        ]
    }
}

export const initialContext = {
    count: 10
}
