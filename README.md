# Feku

Generate intelligent random data based on a spec file.


## Features
- CLI
- examples
- helper functions to generate random data
- customizable output JSON lines (jsonld / ndjson) or JSON Array
- custom spec files to generate new rows based on previously generated data (for example account balance must take into account previous transaction as well)


## Installation

- using PNPM `pnpm add -D feku`
- using NPM `npm install --save-dev feku`

## Using as a CLI

> [!NOTE]
> When installed locally in a project using pnpm, run CLI using PNPM `pnpm feku <spec-file.js> [options]`

Options
- `--count` or `-n` accepts number of items to generate 
- `--array` or `-a`


Examples:

`feku examples/movies.js` by default produces json lines (jsonld / ndjson)

```json lines
{"title":"sint voluptatem","year":2014,"rating":4,"duration":102,"genre":"Romance","image":"http://loremflickr.com/640/480/abstract","description":"Laudantium minima quae libero asperiores voluptatem adipisci. Doloribus rerum praesentium.","cast":["Shawna Pollich DVM","Miss Josefina Schmidt","Lizeth"]}
{"title":"aperiam nostrum odit excepturi sint","year":2001,"rating":2,"duration":110,"genre":"Comedy","image":"http://loremflickr.com/640/480/business","description":"Fuga quod culpa qui. Provident voluptatum qui eum omnis.","cast":["Phil Casper","Sergio Pfeffer","Yvonne"]}
{"title":"iure","year":1985,"rating":5,"duration":134,"genre":"Drama","image":"http://loremflickr.com/640/480/abstract","description":"Quia incidunt ipsum maiores. Libero similique assumenda deserunt aliquam harum iure nemo fuga consequatur.","cast":["Kristin Hintz","Dr. Danielle Batz","Mavis"]}
{"title":"aliquam","year":1989,"rating":1,"duration":113,"genre":"Comedy","image":"http://loremflickr.com/640/480/people","description":"Et omnis ipsam placeat est harum adipisci. Illum et consequatur.","cast":["Gerardo MacGyver","Miss Lester Brakus","Retha"]}
```



`feku examples/people.js --count=5 --array` produces an array of five person objects 

```json
[
  {
    "name": "Lindsay Swaniawski",
    "age": 85
  },
  {
    "name": "Mattie Romaguera",
    "age": 37
  },
  {
    "name": "Tabitha Harber",
    "age": 99
  },
  {
    "name": "Virginia Schinner",
    "age": 69
  },
  {
    "name": "Kara Kihn",
    "age": 47
  }
]

```


We can pass in extra args like start and end date. 

`feku examples/account.js --count 5 --startDate 2022-04-01 --endDate 2022-04-30`

```json lines

{"date":"2022-04-01","desc":"laudantium quae","amt":-8,"bal":1241}
{"date":"2022-04-02","desc":"dolorum eligendi omnis officiis qui","amt":22,"bal":1263}
{"date":"2022-04-05","desc":"rem qui incidunt et","amt":-61,"bal":1202}
{"date":"2022-04-08","desc":"libero porro","amt":-32,"bal":1170}
{"date":"2022-04-20","desc":"aut id","amt":-20,"bal":1150}


```


## Writing a spec file


At minimum, the spec file needs to export a default function (you can give it whatever name the suits it purpose, see examples)

```javascript
export default function rowBuilder({faker}) {
    return {
        name: faker.name.findName()
    }
}
```

we can export `initialContext`, that is passed to the rowBuilder as well which can be used to control seed data. 
These attributes can be overridden from the CLI as well.

```javascript
export const initialContext = {
    count: 30
}
```

## Using as a Library

We can use feku to generate data on the fly in browser/node or any other javascript environment. Following is an example:

```
import { generate } from "feku";

export function generateData(n = 10) {
  const data = [];

  function rowBuilder({ faker }) {
    return {
      name: faker.name.findName(),
      age: faker.datatype.number({ min: 1, max: 100 }),
      city: faker.address.city(),
      phone: faker.phone.phoneNumber("(+##) #### ### ###")
    };
  }

  for (let row of generate({ count: n }, rowBuilder)) {
    data.push(row);
  }

  return data;
}
```



## Built on libraries
- [Faker](https://www.npmjs.com/package/@faker-js/faker)
- [Chance](https://chancejs.com/)
- [date-fns](https://date-fns.org/)


### Other libraries worth checking out: 
- [Fakerator](https://github.com/icebob/fakerator)
- [Json Schema Faker](https://github.com/json-schema-faker/json-schema-faker)
- [DreamJS](https://github.com/adleroliveira/dreamjs)
- [Mocker Data generator](https://github.com/danibram/mocker-data-generator/)
- [Casual](https://github.com/boo1ean/casual)
