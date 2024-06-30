# Use Node.js 18 Alpine base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Set environment variables (can be overridden by docker-compose)
ENV PORT=3000
ENV MONGODB_URI=mongodb://mongo:27017/userdb
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV REDIS_EXPIRE=3600

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
