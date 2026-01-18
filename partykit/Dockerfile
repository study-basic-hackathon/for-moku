FROM node:22-bookworm

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Wranglerのローカル開発サーバーを起動
CMD ["npm", "run", "dev"]