import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import log from './utils/log';

export const hostname = process.env.HOST || 'localhost';
export const port = +(process.env.PORT || 4000);

const app = express();

app
  .use(expressPinoLogger({ logger: log }))
  .use((req, res, next) => {
    res.header('X-Powered-By', 'Silsilah System');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('Access-Control-Allow-Origin', [`${req.protocol}://${req.get('host')}/`]);
    res.header('Access-Control-Allow-Headers', 'access-control-allow-origin, content-type');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.header('Feature-Policy', "geolocation 'self'; midi 'self'; sync-xhr 'self'; microphone 'self'; camera 'self'; magnetometer 'self'; gyroscope 'self'; speaker 'self'; fullscreen 'self'; payment 'self';");
    res.setHeader('Server', 'Silsilah Server');
    next();
  });

export default app;
