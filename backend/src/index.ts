import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'

import { pipelines } from './pipelines'
import { tasks } from './tasks'

const app = new Hono()

app.use('*', prettyJSON())
app.notFound((ctx) => ctx.json({ message: 'Not Found', ok: false }, 404))

app.get('/', (ctx) => ctx.json({
  data: [
    '/pipelines',
    '/tasks',
  ],
}))

app.route('/pipelines', pipelines)
app.route('/tasks', tasks)

export default app
