const createTestCafe = require('testcafe')
const { spawn } = require('child_process')

async function start() {
  const testcafe = await createTestCafe('localhost', 1337, 1338)
  try {
    spawn('sh', ['tests/e2e/scripts/start_examples.sh'])
    const runner = testcafe.createRunner()
    await runner.src(['tests/e2e/specs/**/*.js']).browsers('chrome').run()
  } catch (error) {
    console.log(error)
  } finally {
    await testcafe.close()
    spawn('sh', ['tests/e2e/scripts/clear_ports.sh'])
  }
}

start()
