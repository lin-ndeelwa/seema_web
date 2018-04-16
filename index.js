const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

app.use(express.static('./'))
let httpServer = require('http').createServer(app)

const api = new ParseServer({
    databaseURI: 'mongodb://seema:amees@ds121189.mlab.com:21189/seema', // Connection string for your MongoDB database
    cloud: './cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    serverURL: 'http://localhost:3000/parse', // Don't forget to change to https if needed
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
let port = 3000 || process.env.PORT
console.log(process.env.PORT)
httpServer.listen(port, function() {
    console.log('parse-server-example running on port 1337.');
});