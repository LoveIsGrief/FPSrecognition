const opn = require('opn');
const connect = require('connect')
const connectLR = require('connect-livereload')
const serveStatic = require('serve-static')
const morgan = require('morgan');
const livereload = require('livereload');


// Prepare hosting the directory with connect
let app = connect()

app.use(morgan('tiny'))
app.use(connectLR({
    port: 35729,
    ignore: ['.js', '.svg']
}));
app.use(serveStatic(__dirname))

// A server to host the livereload script
// and trigger reloads on file changes
let server = livereload.createServer();
server.watch(__dirname);
console.log("running livereload")

app.listen(8989);
console.log("running server")

// Opens the default browser pointing to the new server
opn('http://localhost:8989');
