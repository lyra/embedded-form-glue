import os
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

class TestMixins:
    def check_button_label(self, label):
        el = WebDriverWait(self.selenium, 5).until(
            EC.presence_of_element_located((By.CLASS_NAME, "kr-payment-button"))
        )
        self.assertEqual(el.text, label)
