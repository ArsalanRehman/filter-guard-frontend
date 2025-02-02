FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . ./

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]
