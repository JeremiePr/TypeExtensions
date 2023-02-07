import { extend } from '../../src/index';
import '../../src/lib/array.extensions';
import '../../src/lib/date.extensions';
import '../../src/lib/string.extensions';

function assert(predicate: () => boolean): void
{
    if (!predicate())
    {
        throw new Error('Test failed');
    }
}

const testMethods: Array<() => void> = [

    () =>
    {
        const expectedActualPairs = [
            { expected: '2023-02-14', actual: new Date(2023, 1, 14).toDateISOString() },
            { expected: '2005-01-01', actual: new Date(2005, 0, 1).toDateISOString() },
            { expected: '1998-07-15', actual: new Date(1998, 6, 15).toDateISOString() },
            { expected: '2030-12-31', actual: new Date(2030, 11, 31).toDateISOString() }
        ];

        for (const { expected, actual } of expectedActualPairs)
        {
            assert(() => actual === expected)
        }
    },

    () =>
    {
        const expected = ['2023-05-10', '2023-05-11', '2023-05-12', '2023-05-13', '2023-05-14', '2023-05-15'];
        const actual = new Date(2023, 4, 10).getRangeTo(new Date(2023, 4, 15)).map(date => date.toDateISOString());

        assert(() => actual.length === expected.length);

        for (let i = 0; i < actual.length; i++)
        {
            assert(() => actual[i] === expected[i]);
        }
    },

    () =>
    {
        const expectedActualPairs = [
            { expected: '2005-01-01', actual: new Date(2005, 7, 28).getFirstDayOfYear().toDateISOString() },
            { expected: '2023-01-01', actual: new Date(2023, 1, 14).getFirstDayOfYear().toDateISOString() },
            { expected: '1999-01-01', actual: new Date(1999, 8, 7).getFirstDayOfYear().toDateISOString() },
        ];

        for (const { expected, actual } of expectedActualPairs)
        {
            assert(() => actual === expected)
        }
    },

    () =>
    {
        const expectedActualPairs = [
            { expected: '2007-08-28', actual: new Date(2005, 7, 28).addYears(2).toDateISOString() },
            { expected: '2026-02-14', actual: new Date(2023, 1, 14).addYears(3).toDateISOString() },
            { expected: '1991-09-07', actual: new Date(1999, 8, 7).addYears(-8).toDateISOString() },
        ];

        for (const { expected, actual } of expectedActualPairs)
        {
            assert(() => actual === expected)
        }
    }

];

extend();
for (const method of testMethods)
{
    method();
}
console.log("All tests ran successfully!");