FROM node:8.11.4-stretch
MAINTAINER Albert Lacarta <albert.lacarta@lyra-network.es>

# Creating workspace and setting permissions for node user
RUN mkdir -p /opt/code && chown node.node -R /opt
WORKDIR /opt/code

CMD sleep 100d

# Adding webpack
RUN yarn global add webpack webpack-cli gulp gulp-cli

# Changing user to non-root user
USER node