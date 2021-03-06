const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

app.use(express.static('./'))
let httpServer = require('http').createServer(app)

let port = process.env.PORT || 3000

const api = new ParseServer({
    databaseURI: process.env.DB_URL,//'mongodb://seema:amees@ds121189.mlab.com:21189/seema', // Connection string for your MongoDB database
    cloud: './cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    serverURL: `http://localhost:${port}/parse`, // Don't forget to change to https if needed
    liveQuery:{
        classNames:['thing','anything']
    }
});

ParseServer.createLiveQueryServer(httpServer,
    {
        liveQuery:['thing']
    })

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

console.log('env port',port,process.env.PORT)
httpServer.listen(port, function() {
    console.log('parse-server-example running on port 1337.');
});