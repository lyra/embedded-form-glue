import os
import unittest

from selenium import webdriver
from selenium.webdriver import Firefox
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.firefox.options import Options

REMOTE_SELENIUM = os.getenv("REMOTE_SELENIUM", None)

def factory_firefox():
    driver = Firefox()
    return driver

class TestRoot(unittest.TestCase):

    def setUp(self):
        if not REMOTE_SELENIUM:
            self.selenium = factory_firefox()
        else:
            driver = webdriver.Remote(
                command_executor='http://{0}:4444/wd/hub'.format(REMOTE_SELENIUM),
                desired_capabilities=DesiredCapabilities.FIREFOX)
            self.selenium = driver

    def test_failed(self):
        self.selenium.get("{0}/tests/views/index.html".format(os.getenv("WEB_HOST")))
        window_keys = self.selenium.execute_script(u"""
        return Object.keys(window);
        """)

        assert "KRGlue" in window_keys


if __name__ == '__main__':
    unittest.main()
