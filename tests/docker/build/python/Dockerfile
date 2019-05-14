FROM python:3.6.8
MAINTAINER Albert Lacarta <albert.lacarta@lyra-network.es>

# socket issue with this selenium version
# fix not yet released
# https://github.com/SeleniumHQ/selenium/pull/6941
RUN pip install selenium==3.141.0
RUN mkdir /opt/code

WORKDIR /opt/code
CMD sleep 365d
