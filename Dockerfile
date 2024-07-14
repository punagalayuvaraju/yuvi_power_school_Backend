FROM node:18-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY --chown=node:node . .
# Install build dependencies
RUN apk update && \
    apk add --no-cache make gcc g++ python3

# Install npm dependencies
RUN npm install -f

# Clean up build dependencies
RUN apk del make gcc g++ python3 && \
    rm -rf /var/cache/apk/* && \
    npm cache clean --force
EXPOSE 3000
CMD [ "npm", "run", "start" ]