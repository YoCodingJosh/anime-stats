import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'

import type Bindings from './bindings'

import api from './api'

const app = new Hono<{ Bindings: Bindings }>();

// TODO: CORS and CSRF
app.use('*', poweredBy());
app.use('*', prettyJSON());

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
    return c.json({ ok: true, services: ['mal'] });
  } else {
    // I know that I should probably return a 503 (or whatever MAL sends us),
    // but I don't want to signal to the frontend that the service is unavailable.
    return c.json({ ok: false, services: [], message: `MAL is unavailable: ${response.status}` });
  }
})

app.route('/api', api);

export default app
