declare interface Array<T>
{
    sum(selector: ((input: T) => number)): number;
    shuffle(): Array<T>;
    parallel(action: (e: T, i: number) => Promise<void>): Promise<void>;
    groupBy<U>(selector: (e: T) => U): Array<{ key: U; values: Array<T>; }>;
    distinct(): Array<T>;
}

Array.prototype.sum = function <T>(selector: ((input: T) => number)): number
{
    let out = 0;
    for (const e of this)
    {
        const selected = selector(e);
        if (typeof (selected) === 'number')
        {
            out += selected;
        }
    }
    return out;
};

Array.prototype.shuffle = function ()
{
    let currentIndex = this.length;
    let randomIndex: number;
    while (currentIndex != 0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [this[currentIndex], this[randomIndex]] = [this[randomIndex], this[currentIndex]];
    }
    return this;
}

Array.prototype.parallel = function <T>(action: (e: T, i: number) => Promise<void>): Promise<void>
{
    return new Promise<void>((resolve, reject) =>
    {
        for (let i = 0; i < this.length; i++)
        {
            action(this[i], i)
                .then(() => i + 1 === this.length ? resolve() : 0)
                .catch(err => reject(err));
        }
    });
}

Array.prototype.groupBy = function <T, U>(selector: (e: T) => U): Array<{ key: U; values: Array<T> }>
{
    const map = new Map<U, Array<T>>();
    for (const e of this)
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
    return this
        .groupBy(x => x)
        .map(x => x.key);
}
