export default (context, variableName, cb, interval = 150) => {
  let checkVariable = () => {
    if (context[variableName]) {
      cb()
    } else {
      setTimeout(checkVariable, interval)
    }
  }

  setTimeout(checkVariable, 0)
}
