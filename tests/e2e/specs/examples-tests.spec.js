import { Selector } from 'testcafe'

const examples = [
  { name: 'angular', port: '9000' },
  { name: 'emberjs', port: '9001' },
  { name: 'ionic', port: '9002' },
  { name: 'react', port: '9003' },
  { name: 'next', port: '9004' },
  { name: 'svelte', port: '9005' },
  { name: 'vue', port: '9006' }
]

examples.forEach(example => {
  fixture`${example.name} example e2e tests`
    .page`http://127.0.0.1:${example.port}/`

  test('Container for embedded form exists', async t => {
    await t
      .expect(Selector('#myPaymentForm').exists)
      .ok('#myPaymentForm exists', { timeout: 20000 })
  })

  test('Embedded form loads', async t => {
    await t
      .expect(Selector('[kr-form-ready]').exists)
      .ok(`Form loading is slow (more than 60s)`, {
        timeout: 60000
      })
  })

  test('Test payment with correct card works properly', async t => {
    await t
      .expect(Selector('[kr-form-ready]').exists)
      .ok(`Form loading is slow (more than 60s)`, {
        timeout: 60000
      })

    await selectTestCard(t, '.visa.accepted.card-accepted')

    const buttonSelector = await Selector('.kr-payment-button', {
      timeout: 20000
    })

    await t.click(buttonSelector)

    await t
      .expect(Selector('[data-test="payment-message"]').innerText)
      .contains(
        'Payment successful!',
        'check [data-test="payment-message"] innerText',
        {
          timeout: 20000
        }
      )
  })

  test('Test payment with invalid card fails properly', async t => {
    await t
      .expect(Selector('[kr-form-ready]').exists)
      .ok(`Form loading is slow (more than 60s)`, {
        timeout: 60000
      })

    await selectTestCard(t, '.visa.refused.card-refused')

    const buttonSelector = await Selector('.kr-payment-button', {
      timeout: 20000
    })

    await t.click(buttonSelector)

    await t
      .expect(Selector('.kr-form-error.kr-form-error-visible').exists)
      .ok('check error is visible', { timeout: 20000 })
  })

  async function selectTestCard(t, cardClass) {
    const hoverSelector = await Selector('#krcardsMenu', { timeout: 20000 })
    await t.expect(hoverSelector.visible).ok()
    await t.hover(hoverSelector)
    const clickSelector = await Selector(cardClass, { timeout: 20000 })
    await t.click(clickSelector)
  }
})
