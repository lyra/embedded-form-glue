export default function whenDefined<T extends object>(context: T, variableName: Extract<keyof T, string>, callback: () => void, interval?: number): void;
