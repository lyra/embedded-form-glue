const createTestCafe = require('testcafe')
// const { spawn } = require('child_process')

async function start() {
  const testcafe = await createTestCafe('localhost', 1337, 1338)
  try {
    // spawn('sh', ['tests/scripts/start_examples.sh'])
    const runner = testcafe.createRunner()
    await runner
      .src(['tests/e2e/specs/**/*.js'])
      .browsers('chrome:headless')
      .reporter('xunit', '/tmp/test-results/testcafe/results.xml')
      .run()
  } catch (error) {
    console.log(error)
  } finally {
    // spawn('sh', ['tests/scripts/clear_ports.sh'])
    await testcafe.close()
    process.exit()
  }
}

start()
