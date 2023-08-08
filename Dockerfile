FROM node:18-alpine

COPY fireblocks-json-rpc-*.tgz fireblocks-json-rpc.tgz
RUN npm install -g fireblocks-json-rpc.tgz && \
    rm fireblocks-json-rpc.tgz

ENTRYPOINT ["fireblocks-json-rpc"]