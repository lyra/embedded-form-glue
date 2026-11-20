export default function whenDefined(
  context,
  variableName,
  callback,
  interval = 150
) {
  const checkVariable = () => {
    if (context[variableName]) {
      callback()
    } else {
      setTimeout(checkVariable, interval)
    }
  }
  setTimeout(checkVariable, 0)
}
