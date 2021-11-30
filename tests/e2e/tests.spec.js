import { Selector } from "testcafe";

fixture`e2e tests`;

test.page`http://127.0.0.1:8080/tests/views/addFormMinimal.html`(
  "KR.addForm minimal",
  async (t) => {
    await t
      .expect(Selector("[kr-form-ready]").exists)
      .ok(`Form loading is slow (more than 60s)`, {
        timeout: 60000,
      });
    await t.expect(Selector(".kr-payment-button").exists).ok();
    await t
      .expect((await Selector(".kr-payment-button").innerText).trim())
      .eql("PAY");
  }
);

test.page`http://127.0.0.1:8080/tests/views/attachFormMinimal.html`(
  "KR.attachForm minimal",
  async (t) => {
    await t
      .expect(Selector("[kr-form-ready]").exists)
      .ok(`Form loading is slow (more than 60s)`, {
        timeout: 60000,
      });
    await t.expect(Selector(".kr-payment-button").exists).ok();
    await t
      .expect((await Selector(".kr-payment-button").innerText).trim())
      .eql("PAY");
  }
);

test.page`http://127.0.0.1:8080/tests/views/addFormReload.html`(
  "KR.addForm reload",
  async (t) => {
    await t
      .expect(Selector("[kr-form-ready]").exists)
      .ok(`Form loading is slow (more than 60s)`, {
        timeout: 60000,
      });
    await t.expect(Selector(".kr-payment-button").exists).ok();
    await t
      .expect((await Selector(".kr-payment-button").innerText).trim())
      .eql("PAY");
  }
);

test.page`http://127.0.0.1:8080/tests/views/addFormInvalid.html`(
  "KR.addForm invalid data",
  async (t) => {
    await t
      .expect(Selector("#test-error").exists)
      .ok(`No initialization error`, {
        timeout: 30000,
      });
    await t
      .expect(Selector("#test-error").innerText)
      .eql("[CHANGE_ME: JAVASCRIPT ENDPOINT] is not a valid endpoint domain");
  }
);

test.page`http://127.0.0.1:8080/tests/views/addFormInvalidPublicKey.html`(
  "KR.addForm invalid public key",
  async (t) => {
    await t
      .expect(Selector("#test-error").exists)
      .ok(`No initialization error`, {
        timeout: 30000,
      });
    await t
      .expect(Selector("#test-error").innerText)
      .eql(
        "[testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5] is not a valid public key"
      );
  }
);

test.page`http://127.0.0.1:8080/tests/views/addFormDomainWithoutProtocol.html`(
  "KR.addForm + domain without protocol",
  async (t) => {
    await t
      .expect(Selector("#test-error").exists)
      .ok(`No initialization error`, {
        timeout: 30000,
      });
    await t
      .expect(Selector("#test-error").innerText)
      .eql("[api.lyra.com] is not a valid endpoint domain");
  }
);
