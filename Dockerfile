FROM node:20

WORKDIR /src
COPY . .
RUN npm install
RUN npm run build

EXPOSE 5001
CMD ["npm", "start"]
