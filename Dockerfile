# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start:prod"]
