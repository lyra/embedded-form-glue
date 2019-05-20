import os
import unittest
import time

from helpers import TestMixins
from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options

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
        self.selenium.find_element_by_id("test-ready")
        self.check_button_label("PAY")

    # python tests/main_test.py MainTestCase.test_attach_form_minimal
    def test_attach_form_minimal(self):
        self.selenium.get("{0}/tests/views/attachFormMinimal.html".format(os.getenv("WEB_HOST")))
        self.selenium.find_element_by_id("test-ready")
        self.check_button_label("PAY ME NOW")

    # python tests/main_test.py MainTestCase.test_add_form_reload
    def test_attach_form_minimal(self):
        self.selenium.get("{0}/tests/views/addFormReload.html".format(os.getenv("WEB_HOST")))
        time.sleep(5)
        self.selenium.find_element_by_id("test-ready")
        self.check_button_label("PAY")

    def tearDown(self):
        super().setUp()
        self.selenium.quit()

if __name__ == '__main__':
    unittest.main()
