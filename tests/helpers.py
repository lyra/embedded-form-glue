import os


class TestMixins:
    def check_button_label(self, label):
        el = self.selenium.find_element_by_class_name("kr-payment-button")
        self.assertEqual(el.text, label)
