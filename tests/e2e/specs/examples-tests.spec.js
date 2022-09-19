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
    const selector = await Selector('#myPaymentForm')
    await t.expect(selector.exists).ok()
  })

  test('Embedded form loads', async t => {
    const selector = await Selector('.kr-embedded')
    await t.expect(selector.exists).ok()
  })

  test('Test payment with correct card works properly', async t => {
    await selectTestCard(t, '.visa.accepted.card-accepted')
    const buttonSelector = await Selector('.kr-payment-button')
    await t.click(buttonSelector)
    const messageSelector = await Selector('[data-test="payment-message"]')
    await t.expect(messageSelector.innerText).contains('Payment successful!')
  })

  test('Test payment with invalid card fails properly', async t => {
    await selectTestCard(t, '.visa.refused.card-refused')
    const buttonSelector = await Selector('.kr-payment-button')
    await t.click(buttonSelector)
    const messageSelector = await Selector(
      '.kr-form-error.kr-form-error-visible'
    )
    await t.expect(messageSelector.exists).ok()
  })

  async function selectTestCard(t, cardClass) {
    const hoverSelector = await Selector('#krcardsMenu')
    await t.expect(hoverSelector.visible).ok()
    await t.hover(hoverSelector)
    const clickSelector = await Selector(cardClass)
    await t.click(clickSelector)
  }
})
