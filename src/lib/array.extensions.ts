declare global
{
    interface Array<T>
    {
        sum(selector: ((input: T) => number)): number;
        indexWhere(predicate: ((input: T) => boolean)): number;
        shuffle(): Array<T>;
        parallel(action: (e: T, i: number) => Promise<void>): Promise<void>;
        groupBy<U>(selector: (e: T) => U): Array<{ key: U; values: Array<T>; }>;
        distinct(): Array<T>;
        filterNil(): Array<NonNullable<T>>;
    }
}

export const extendArray = () =>
{
    Array.prototype.sum = function <T>(selector: ((input: T) => number)): number
    {
        let out = 0;
        for (const e of (<Array<T>>this))
        {
            const selected = selector(e);
            if (typeof (selected) === 'number')
            {
                out += selected;
            }
        }
        return out;
    };

    Array.prototype.indexWhere = function <T>(predicate: ((input: T) => boolean)): number
    {
        for (let i = 0; i < (<Array<T>>this).length; i++)
        {
            if (predicate((<Array<T>>this)[i]))
            {
                return i;
            }
        }
        return -1;
    };

    Array.prototype.shuffle = function <T>()
    {
        let currentIndex = (<Array<T>>this).length;
        let randomIndex: number;
        while (currentIndex != 0)
        {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [(<Array<T>>this)[currentIndex], (<Array<T>>this)[randomIndex]] = [(<Array<T>>this)[randomIndex], (<Array<T>>this)[currentIndex]];
        }
        return (<Array<T>>this);
    }

    Array.prototype.parallel = function <T>(action: (e: T, i: number) => Promise<void>): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            for (let i = 0; i < (<Array<T>>this).length; i++)
            {
                action((<Array<T>>this)[i], i)
                    .then(() => i + 1 === (<Array<T>>this).length ? resolve() : 0)
                    .catch(err => reject(err));
            }
        });
    }

    Array.prototype.groupBy = function <T, U>(selector: (e: T) => U): Array<{ key: U; values: Array<T> }>
    {
        const map = new Map<U, Array<T>>();
        for (const e of (<Array<T>>this))
        {
            const key = selector(e);
            const values = map.get(key);
            if (values)
            {
                values.push(e);
            }
            else
            {
                map.set(key, [e]);
            }
        }
        return Array.from(map).map(([key, values]) => ({ key, values }));
    }

    Array.prototype.distinct = function <T>(): Array<T>
    {
        return (<Array<T>>this)
            .groupBy(x => x)
            .map(x => x.key);
    }

    Array.prototype.filterNil = function <T>(): Array<NonNullable<T>>
    {
        const out: Array<NonNullable<T>> = [];
        for (const e of <Array<T>>this)
        {
            if (!e) continue;
            out.push({ ...e } as NonNullable<T>);
        }
        return out;
    }
};