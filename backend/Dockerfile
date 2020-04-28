# Specify a base image
#FROM node:12.16.2-alpine AS alpine
FROM node:12.16.2
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 4000

# Default command
CMD ["npm", "run", "start"]