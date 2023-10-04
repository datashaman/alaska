import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'

import { pipelines } from './pipelines'
import { tasks } from './tasks'

const app = new Hono()

app.use('*', cors())
app.use('*', prettyJSON())
app.notFound((ctx) => ctx.json({ message: 'Not Found', ok: false }, 404))

app.get('/', (ctx) => ctx.json({
  data: [
    {
      id: 'pipelines',
      href: '/pipelines',
      title: 'Pipelines',
      description: 'Pipeline resource for executing tasks in sequence',
    },
    {
      id: 'tasks',
      href: '/tasks',
      title: 'Tasks',
      description: 'Task resource for proxying to a remote resource',
    },
  ],
}))

app.route('/pipelines', pipelines)
app.route('/tasks', tasks)

export default app
