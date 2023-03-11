declare global
{
    interface Date
    {
        toDateISOString(separator?: string): string;
        getRangeTo(date: Date): Array<Date>;
        getFirstDayOfYear(): Date;
        addYears(years: number): Date;
    }
}

export const extendDate = () =>
{
    Date.prototype.toDateISOString = function (separator?: string)
    {
        separator ??= '-';
        const year = this.getFullYear().toString();
        const month = this.getMonth() < 9 ? `0${this.getMonth() + 1}` : (this.getMonth() + 1).toString();
        const day = this.getDate() < 10 ? `0${this.getDate()}` : this.getDate().toString();
        return `${year}${separator}${month}${separator}${day}`;
    };

    Date.prototype.getRangeTo = function (date: Date): Array<Date>
    {
        const from = new Date(this.getFullYear(), this.getMonth(), this.getDate());
        const to = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const dates = new Array<Date>();
        for (const d = from; d <= to; d.setDate(d.getDate() + 1))
        {
            dates.push(new Date(d.getTime()));
        }
        return dates;
    }

    Date.prototype.getFirstDayOfYear = function (): Date
    {
        return new Date(this.getFullYear(), 0, 1);
    }

    Date.prototype.addYears = function (years: number): Date
    {
        return new Date(this.getFullYear() + years, this.getMonth(), this.getDate());
    }
};