import os
import unittest
import time

from helpers import TestMixins
from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

REMOTE_SELENIUM = os.getenv("REMOTE_SELENIUM", None)

def factory_chrome():
    driver = Chrome()
    return driver

class MainTestCase(unittest.TestCase, TestMixins):

    def setUp(self):
        super().setUp()
        if not REMOTE_SELENIUM:
            self.selenium = factory_chrome()
        else:
            driver = webdriver.Remote(
                command_executor='http://{0}:4444/wd/hub'.format(REMOTE_SELENIUM),
                desired_capabilities=DesiredCapabilities.CHROME)
            driver.implicitly_wait(5000)
            self.selenium = driver

    # python tests/main_test.py MainTestCase.test_add_form_minimal
    def test_add_form_minimal(self):
        self.selenium.get("{0}/tests/views/addFormMinimal.html".format(os.getenv("WEB_HOST")))
        WebDriverWait(self.selenium, 5).until(
            EC.presence_of_element_located((By.ID, "test-ready"))
        )
        self.check_button_label("PAY")

    # python tests/main_test.py MainTestCase.test_attach_form_minimal
    def test_attach_form_minimal(self):
        self.selenium.get("{0}/tests/views/attachFormMinimal.html".format(os.getenv("WEB_HOST")))
        WebDriverWait(self.selenium, 5).until(
            EC.presence_of_element_located((By.ID, "test-ready"))
        )
        self.check_button_label("PAY")

    # python tests/main_test.py MainTestCase.test_add_form_reload
    def test_add_form_reload(self):
        self.selenium.get("{0}/tests/views/addFormReload.html".format(os.getenv("WEB_HOST")))
        WebDriverWait(self.selenium, 5).until(
            EC.presence_of_element_located((By.ID, "test-ready"))
        )
        self.check_button_label("PAY")

    # python tests/main_test.py MainTestCase.test_add_form_invalid
    def test_add_form_invalid(self):
        self.selenium.get("{0}/tests/views/addFormInvalid.html".format(os.getenv("WEB_HOST")))
        element = WebDriverWait(self.selenium, 5).until(
            EC.presence_of_element_located((By.ID, "test-error"))
        )

        assert element.get_attribute('innerHTML') == "[CHANGE_ME: JAVASCRIPT ENDPOINT] is not a valid endpoint domain", element.get_attribute('innerHTML')

    # python tests/main_test.py MainTestCase.test_add_form_invalid
    def test_add_form_invalid_pubkey(self):
        self.selenium.get("{0}/tests/views/addFormInvalidPublicKey.html".format(os.getenv("WEB_HOST")))
        element = WebDriverWait(self.selenium, 5).until(
            EC.presence_of_element_located((By.ID, "test-error"))
        )

        assert element.get_attribute('innerHTML') == "[testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5] is not a valid public key", element.get_attribute('innerHTML')

    # python tests/main_test.py MainTestCase.test_add_form_invalid_domain_protocol
    def test_add_form_invalid_domain_protocol(self):
        self.selenium.get("{0}/tests/views/addFormDomainWithoutProtocol.html".format(os.getenv("WEB_HOST")))
        element = WebDriverWait(self.selenium, 5).until(
            EC.presence_of_element_located((By.ID, "test-error"))
        )

        assert element.get_attribute('innerHTML') == "[api.lyra.com] is not a valid endpoint domain", element.get_attribute('innerHTML')

    def tearDown(self):
        super().setUp()
        self.selenium.quit()

if __name__ == '__main__':
    unittest.main()
