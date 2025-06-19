FROM node:18

WORKDIR /app
COPY . .

# Install static server
RUN npm install -g http-server

# Expose the port used by http-server
EXPOSE 5000

# Run the server
CMD ["http-server", "-p", "5000"]
