export function isDataEmptyorUndefined(data: any) {
    return (
        data === undefined ||
        data === null ||
        data === "" ||
        Number.isNaN(data) ||
        false ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === "object" && Object.keys(data).length === 0)
    );
}
