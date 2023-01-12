declare global
{
    interface Date
    {
        toSqlString(): string;
        getRangeTo(date: Date): Array<Date>;
    }
}

export const extendDate = () =>
{
    Date.prototype.toSqlString = function ()
    {
        const year = this.getFullYear().toString();
        const month = this.getMonth() < 9 ? `0${this.getMonth() + 1}` : (this.getMonth() + 1).toString();
        const day = this.getDate() < 10 ? `0${this.getDate()}` : this.getDate().toString();
        return `${year}-${month}-${day}`;
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
};