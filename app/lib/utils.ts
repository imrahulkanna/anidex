export function isDataEmptyorUndefined<T>(data: T | undefined | null): data is undefined | null {
    return (
        data === undefined ||
        data === null ||
        data === "" ||
        Number.isNaN(data) ||
        false ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === "object" && data !== null && Object.keys(data).length === 0)
    );
}

export function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
}
