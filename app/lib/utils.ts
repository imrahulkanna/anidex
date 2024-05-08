export function isDataEmptyorUndefined(data: any) {
    return (
        (Array.isArray(data) && data.length === 0) ||
        Object.keys(data).length === 0 ||
        data === undefined ||
        data === null ||
        data === "" ||
        Number.isNaN(data) ||
        false
    );
}
