export default function whenDefined<T extends object>(
  context: T,
  variableName: Extract<keyof T, string>,
  callback: () => void,
  interval = 150
): void {
  const checkVariable = () => {
    if (context[variableName]) {
      callback()
    } else {
      setTimeout(checkVariable, interval)
    }
  }

  setTimeout(checkVariable, 0)
}
