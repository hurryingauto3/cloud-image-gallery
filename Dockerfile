# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using an Express server
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the server code
COPY --from=build /app/server ./server

# Copy the build files from the React app
COPY --from=build /app/build ./build

# Install express
COPY package*.json ./
RUN npm install

# Expose the port the app runs on
EXPOSE 3001

# Start the server
CMD ["node", "server/server.js"]
