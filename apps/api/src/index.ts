import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'

import { Health } from '@repo/schemas'

import type Bindings from './bindings'
import api from './api'

const isProduction = process.env.NODE_ENV === 'production';

const productionOrigins = [
  'https://codingjosh.com',
  'https://anime-stats.codingjosh.com',
];

const developmentOrigins = [
  'http://localhost:6969',
];

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', poweredBy({
  serverName: 'Power of Friendship'
}));
app.use('*', prettyJSON());
app.use('*', cors({
  origin: isProduction ? productionOrigins : developmentOrigins,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.get('/', (c) => {
  return c.json({ message: 'Yo!' })
})

app.get('/health', async (c) => {
  const response = await fetch('https://api.myanimelist.net/v2/anime/21273',
    { headers: { 'X-MAL-CLIENT-ID': c.env.MAL_CLIENT_ID } }
  );

  // console.log("Actual MAL response: ", await response.text());

  if (response.ok) {
    const value: Health = {
      ok: true,
      services: ['mal']
    }

    return c.json(value, 200);
  } else {
    const value: Health = {
      ok: false,
      services: ['mal'],
      message: `MAL is unavailable: ${response.status}`
    }

    // I know that I should probably return a 503 (or whatever MAL sends us),
    // but I don't want to signal to the frontend that the service is unavailable.
    return c.json(value, 200);
  }
})

app.route('/api', api);

export default app
