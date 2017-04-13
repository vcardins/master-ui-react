const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db/db.json');
const middlewares  = jsonServer.defaults();
const Console = console;

server.use(middlewares);
server.use('/api/v1', router)
server.listen(3333, () => Console.log('JSON Server is running'));
