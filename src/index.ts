import './lib/date.extensions';
import './lib/array.extensions';
import './lib/string.extensions';
import { extendArray } from './lib/array.extensions';
import { extendDate } from './lib/date.extensions';
import { extendString } from './lib/string.extensions';

export const extend = () =>
{
    extendArray();
    extendDate();
    extendString();
};