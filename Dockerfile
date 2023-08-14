FROM node:18-alpine

COPY *.tgz fireblocks-json-rpc.tgz
RUN npm install -g fireblocks-json-rpc.tgz ethers && \
    rm fireblocks-json-rpc.tgz

ENTRYPOINT ["fireblocks-json-rpc"]