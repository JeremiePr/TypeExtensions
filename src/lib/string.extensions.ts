declare global
{
    interface String
    {
        toNumberOrNull(): number | null;
        toBooleanOrNull(): boolean | null;
        isValidUrl(): boolean;
        toFilename(): string;
        isAlphaNumeric(): boolean;
    }
}

export const extendString = () =>
{
    String.prototype.toNumberOrNull = function (): number | null
    {
        const numberValue = Number(this);
        if (!numberValue || isNaN(numberValue) || numberValue === Infinity)
        {
            return null;
        } else
        {
            return numberValue;
        }
    }

    String.prototype.toBooleanOrNull = function (): boolean | null
    {
        const booleanValue = Boolean(this);
        if (!booleanValue)
        {
            return null;
        }
        else
        {
            return booleanValue;
        }
    }

    String.prototype.isValidUrl = function (): boolean
    {
        return this.startsWith('http://') || this.startsWith('https://');
    }

    String.prototype.toFilename = function (): string
    {
        return this.isValidUrl() ? this.replace(/^.*[\\\/]/, '') : this.toString();
    }

    String.prototype.isAlphaNumeric = function (): boolean
    {
        return !isNaN(Number(this)) || this.length === 1 && /^[a-zA-ZÀ-ÿ]+$/.test(this[0]);
    }

};