# Sports Pulse

Sports Management System for everyone !

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js
- You have a basic understanding of JavaScript and Node.js

## Installing and Running the Server

To install and run the server, follow these steps:

1. Clone this repository to your local machine
2. Navigate to the project root directory
3. Open terminal window in this directory
4. Install the dependencies: `yarn`
5. Start the server: `yarn server`

The server should now be running on `http://localhost:5000`

## Installing and Running the Client

To install and run the client, follow these steps:

1. Clone this repository to your local machine
2. Navigate to the client directory: `cd client`
3. Open terminal window in this directory
4. Install the dependencies: `yarn`
5. Start the client: `yarn start`

The client should now be running on `http://localhost:3001`

## Running Both the Server and Client

To run both the server and client at the same time, follow these steps:

1. Clone this repository to your local machine
2. Open terminal window in this directory
3. The backend comes with `concurrently` so you can run both frontend and backend on one terminal.
4. Make sure you have done step 1 - 3 of **Installing and Running the Server** and step 1 - 3 of **Installing and Running the Client** (Installing the dependencies)
5. Start the project (frontend + backend): `yarn dev`

The server should now be running on `http://localhost:5000` and the client should be running on `http://localhost:3000`
