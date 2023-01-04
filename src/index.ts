import './lib/date-extensions';
import './lib/array-extensions';
import { extendArray } from './lib/array-extensions';
import { extendDate } from './lib/date-extensions';

export const extend = () =>
{
    extendArray();
    extendDate();
};