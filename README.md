# TypeExtensions

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)
* [Contributors](#contributors)
* [Links](#links)

## General info

JejeQL is a tool that can translate a query into a predicate and filter data.

## Technologies

* Node.js
* Typescript

## Setup

```
npm install @jeje-devs/type-extensions
```

## Usage

First of all, you need to call the **extend()** method. Otherwise the extensions won't work
```ts
import { extend } from '@jeje-devs/type-extensions';

extend();
```

### String extensions

* **toNumberOrNull**

Converts a string to number if possible. Otherwise gives null
```ts
const numberValue = '45'.toNumberOrNull();
// returns 45
```

* **toBooleanOrNull**

Converts a string to boolean if possible. Otherwise gives null.
The accepted values can be 'true', '1', 'false', '0'
```ts
const booleanValue = 'true'.toBooleanOrNull();
// returns true
```

* **isValidUrl**

Indicates whether a string is a basic url or not
```ts
const isValid = 'http://localhost:8080/api/test'.isValidUrl();
// returns true
```

* **toFilename**

Converts a string url to a filename
```ts
const filename = 'http://localhost:8080/img/my_image.jpg?h=45712'.toBooleanOrNull();
// returns 'my_image.jpg'
```

* **isAlphanumeric**

Indicates whether a string is alphanumeric or not.
This means that it contains only numbers
```ts
const isAlphanumeric = '4526756'.isAlphanumeric();
// returns true
```

### Array extensions

* **sum**

Sums all items of an array
```ts
const sum = [7, 5, -6, 2].sum();
// returns 8
```

* **indexWhere**

Gives the first index found when the given predicate matches
```ts
const index = ['a', 'f', 'z', 'u'].indexWhere(x => x === 'z');
// returns 2
```

* **shuffle**

Shuffles an array
```ts
const shuffleArray = [7, 5, -6, 2].shuffle();
```

* **parallel**

Asynchronously Runs an action method for each array element
```ts
await [{ name: 'John' }, { name: 'Mary' }, { name: 'Paul' }].parallel(async (item, index) =>
{
    // Do asynchronous stuff;
    item.name = `Hello ${item.name}!`;
})
```

* **groupBy**

Groups an array by a given key
```ts
const array = [{ personId: 1, paid: 10.50 }, { personId: 1, paid: 53.20 }, { personId: 2, paid: 12.99 }]
    .groupBy(x => x.personId);
/*
returns [
    { key: 1, values: [{ personId: 1, paid: 10.50 }, { personId: 1, paid: 53.20 }] },
    { key: 2, values: [{ personId: 2, paid: 12.99 }] }
]
*/
```

* **distinct**

Removes all duplicates in an array
```ts
const distinctArray = [1, 2, 1, 3, 1, 4].distinct();
// returns [1, 2, 3, 4]
```

* **filterNil**

Removes all 'null' or 'undefined' items from an array
```ts
const filtered = ['foo', null, 'bar', undefined, 'baz'].filterNil();
// returns ['foo', 'bar', 'baz']
```

### Date extensions

* **toDateISOString**

Gives a date string without time, as ISO
```ts
const date = new Date(2023, 5, 30).toDateISOString();
// returns 2023-06-30
```

* **getRangeTo**

Gives an array of dates from start to end parameters
```ts
const dates = new Date(2023, 0, 1).getRangeTo(2023, 0, 5);
// returns as dates [2023-01-01, 2023-01-02, 2023-01-03, 2023-01-04, 2023-01-05]
```

* **addYears**

Add years to a date
```ts
const date = new Date(2023, 5, 30).addYears(2);
// returns as date 2025-06-30
```

## Contributors

- [Jérémie Primas](https://github.com/JeremiePr)

## Links

- [npm](https://www.npmjs.com/package/@jeje-devs/type-extensions)
- [GitHub](https://github.com/JeremiePr/TypeExtensions)