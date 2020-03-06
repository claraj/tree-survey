## Tree Vote Site 

Vote for your favorite tree.

Uses https://github.com/typicode/json-server to provide a mock API for testing

Builds the tree choices from the API
When user votes, their choice is saved to the API

## Set up

1. Install and start json-server.  

Open a command prompt or terminal and navigate to the directory with this code in.

PCs may be able to run 

`npm install -g json-server`

Then they will be able to start the server from the same directory as the server.json file with 

`json-server --watch server.json`

Macs can try 

`npm install -g json-server`

But if that fails with a permission error, try 

`npm i json-server`

And then 

`node_modules/.bin/json-server --watch server.json`

2. Running json-server

This is an API server running on your computer. Try some of the example URLs in your browser, for example, http://localhost:3000/trees

You can also send POST requests to the API server to add data, as well as PATCH to edit, and DELETE to delete.

3. Stopping json-server

Press Control+C from your terminal/command prompt to stop server. Yes, Macs too.  
