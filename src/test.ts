import { runTests, theArray, theBoolean, theNumber, theObject, theString } from '@jeje-devs/plume-testing';
import { extendArray } from './lib/array.extensions';
import { extendDate } from './lib/date.extensions';
import { extendString } from './lib/string.extensions';

runTests<void>({

    'TestStringToNumberOrNull': () =>
    {
        theNumber('5'.toNumberOrNull()).shouldBe(5);
        theNumber('8.74'.toNumberOrNull()).shouldBe(8.74);
        theObject('Hello World'.toNumberOrNull()).shouldBeNil();
    },

    'TestStringToBooleanOrNull': () =>
    {
        theBoolean('true'.toBooleanOrNull()).shouldBeTrue();
        theBoolean('false'.toBooleanOrNull()).shouldBeFalse();
        theBoolean('1'.toBooleanOrNull()).shouldBeTrue();
        theObject('2'.toBooleanOrNull()).shouldBeNil();
        theObject('Hello World'.toBooleanOrNull()).shouldBeNil();
    },

    'TestStringIsValidUrl': () =>
    {
        theBoolean('https://www.npmjs.com'.isValidUrl()).shouldBeTrue();
        theBoolean('http://localhost:8080'.isValidUrl()).shouldBeTrue();
        theBoolean('Hello World'.isValidUrl()).shouldBeFalse();
    },

    'TestStringToFilename': () =>
    {
        theString('https://www.website.com/img/my_image.jpg?query=something'.toFilename()).shouldBe('my_image.jpg');
        theString('my_image.jpg'.toFilename()).shouldBe('my_image.jpg');
    },

    'TestStringIsAlphaNumeric': () =>
    {
        theBoolean('74127485'.isAlphaNumeric()).shouldBeTrue();
        theBoolean('24245'.isAlphaNumeric()).shouldBeTrue();
        theBoolean('457d356e'.isAlphaNumeric()).shouldBeFalse();
        theBoolean('47 87 01'.isAlphaNumeric()).shouldBeFalse();
        theBoolean('Hello World'.isAlphaNumeric()).shouldBeFalse();
    },

    'TestArraySum': () =>
    {
        const array = [{ val: 5 }, { val: 4 }, { val: -7 }, { val: 2 }];
        theNumber(array.sum(x => x.val)).shouldBe(4);
    },

    'TestArrayIndexWhere': () =>
    {
        const array = [{ val: 5 }, { val: 4 }, { val: -7 }, { val: 2 }];
        theNumber(array.indexWhere(x => x.val === 4)).shouldBe(1);
        theNumber(array.indexWhere(x => x.val === 2)).shouldBe(3);
        theNumber(array.indexWhere(x => x.val === 10)).shouldBe(-1);
    },

    'TestArrayShuffle': () =>
    {
        const array = [{ val: 5 }, { val: 4 }, { val: -7 }, { val: 2 }];
        theArray(array.shuffle()).shouldHaveLength(array.length);
    },

    'TestArrayParallel': async () =>
    {
        const array = [{ val: 5 }, { val: 4 }, { val: -7 }, { val: 2 }];
        await array.parallel(async x =>
        {
            x.val++;
        });

        const expected = [{ val: 6 }, { val: 5 }, { val: -6 }, { val: 3 }];

        theArray(array).shouldHaveAllItemsEqualPropertiesWith(expected, x => x.val);
    },

    'TestArrayGroupBy': () =>
    {
        const countries = [
            { name: 'Canada', continent: 'America' },
            { name: 'Mexico', continent: 'America' },
            { name: 'Spain', continent: 'Europe' },
            { name: 'Namibia', continent: 'Africa' },
            { name: 'Cameroon', continent: 'Africa' },
            { name: 'Uruguay', continent: 'America' },
            { name: 'Mongolia', continent: 'Asia' },
            { name: 'Denmark', continent: 'Europe' }
        ];

        const actual = countries
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .groupBy(x => x.continent)
            .sort((a, b) => a.key > b.key ? 1 : -1);

        const expected = [
            {
                key: 'Africa',
                values: [{ name: 'Cameroon', continent: 'Africa' }, { name: 'Namibia', continent: 'Africa' }]
            },
            {
                key: 'America',
                values: [{ name: 'Canada', continent: 'America' }, { name: 'Mexico', continent: 'America' }, { name: 'Uruguay', continent: 'America' }]
            },
            {
                key: 'Asia',
                values: [{ name: 'Mongolia', continent: 'Asia' }]
            },
            {
                key: 'Europe',
                values: [{ name: 'Denmark', continent: 'Europe' }, { name: 'Spain', continent: 'Europe' }]
            }
        ];

        theArray(actual).shouldHaveLength(expected.length);

        for (let i = 0; i < actual.length; i++)
        {
            const actualContinent = actual[i];
            const expectedContinent = expected[i];

            theString(actualContinent.key).shouldBe(expectedContinent.key);
            theArray(actualContinent.values).shouldHaveLength(expectedContinent.values.length);
            theArray(actualContinent.values).shouldHaveAllItemsEqualPropertiesWith(expectedContinent.values, x => x.name, x => x.continent);
        }
    },

    'TestArrayDistinct': () =>
    {
        const array = ['Apple', 'Orange', 'Grape', 'Apple', 'Grape', 'Apple'];

        const actual = array.distinct();
        const expected = ['Apple', 'Orange', 'Grape'];

        theArray(actual).shouldHaveLength(expected.length);
        theArray(actual).shouldHaveAllItemsCheckingPredicateWith(expected, (a, e) => a === e);
    },

    'TestArrayFilterNil': () =>
    {
        const array: Array<number | null | undefined> = [8, 47.3, null, 0, -47, undefined, 312];

        const actual = array.filterNil();
        const expected = [8, 47.3, 0, -47, 312];

        theArray(actual).shouldHaveLength(expected.length);
        theArray(actual).shouldHaveAllItemsCheckingPredicateWith(expected, (a, e) => a === e);
    },

    'TestDateToDateISOString': () =>
    {
        const actualExpectedPairs = [
            { actual: new Date(2023, 1, 14).toDateISOString(), expected: '2023-02-14' },
            { actual: new Date(2005, 0, 1).toDateISOString('_'), expected: '2005_01_01' },
            { actual: new Date(1998, 6, 15).toDateISOString('/'), expected: '1998/07/15' },
            { actual: new Date(2030, 11, 31).toDateISOString(), expected: '2030-12-31' }
        ];

        for (const { expected, actual } of actualExpectedPairs)
        {
            theString(actual).shouldBe(expected);
        }
    },

    'TestDateGetRangeTo': () =>
    {
        const actual = new Date(2023, 4, 10).getRangeTo(new Date(2023, 4, 15)).map(date => date.toDateISOString());
        const expected = ['2023-05-10', '2023-05-11', '2023-05-12', '2023-05-13', '2023-05-14', '2023-05-15'];

        theArray(actual).shouldHaveLength(expected.length);
        theArray(actual).shouldHaveAllItemsCheckingPredicateWith(expected, (actual, expected) => actual === expected);
    },

    'TestDateGetFirstDayOfYear': () =>
    {
        const actualExpectedPairs = [
            { actual: new Date(2005, 7, 28).getFirstDayOfYear().toDateISOString(), expected: '2005-01-01' },
            { actual: new Date(2023, 1, 14).getFirstDayOfYear().toDateISOString(), expected: '2023-01-01' },
            { actual: new Date(1999, 8, 7).getFirstDayOfYear().toDateISOString(), expected: '1999-01-01' }
        ];

        for (const { expected, actual } of actualExpectedPairs)
        {
            theString(actual).shouldBe(expected);
        }
    },

    'TestDateAddYears': () =>
    {
        const actualExpectedPairs = [
            { actual: new Date(2005, 7, 28).addYears(2).toDateISOString(), expected: '2007-08-28' },
            { actual: new Date(2023, 1, 14).addYears(3).toDateISOString(), expected: '2026-02-14' },
            { actual: new Date(1999, 8, 7).addYears(-8).toDateISOString(), expected: '1991-09-07' }
        ];

        for (const { expected, actual } of actualExpectedPairs)
        {
            theString(actual).shouldBe(expected);
        }
    }

}, () =>
{
    extendArray();
    extendDate();
    extendString();
})