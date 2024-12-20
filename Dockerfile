FROM oven/bun:latest

WORKDIR /echo
COPY package.json ./
COPY . .

RUN bun install
RUN bun run build

EXPOSE 1234

CMD [ "bun", "/echo/server/server.ts"]
