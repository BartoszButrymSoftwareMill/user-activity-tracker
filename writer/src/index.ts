import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import usersRoute from './routes/users.js';
import activitiesRoute from './routes/activities.js';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Writer User!');
});

app.route('/users', usersRoute);

app.route('/activities', activitiesRoute);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
