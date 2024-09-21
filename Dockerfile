# Dockerfile

# Use Node.js 18 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Set the command to run the app
CMD ["npm", "start"]