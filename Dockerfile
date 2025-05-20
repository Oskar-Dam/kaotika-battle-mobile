FROM node:20

WORKDIR /src
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
