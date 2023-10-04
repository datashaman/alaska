import { Hono } from 'hono'
import { negotiate } from './utils'

const resources = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'Hello World task',
    href: '/tasks/hello-world',
    method: 'POST',
    params: [
      {
        name: 'name',
        type: 'string',
      }
    ],
  },
  {
    id: 'preprocessor',
    title: 'Preprocessor',
    url: '/tasks/preprocessor',
    method: 'POST',
    params: [
      {
        name: 'cleanWhitespace',
        type: 'boolean',
        default: true,
      },
      {
        name: 'cleanEmptyLines',
        type: 'boolean',
        default: true,
      },
      {
        name: 'splitBy',
        type: 'string',
        options: {
          '': 'None',
          sentence: 'Sentence',
        },
      },
      {
        name: 'splitLength',
        type: 'number',
      },
    ],
  },
]

const findResource = (ctx) => resources.find((resource) => resource.id === ctx.req.param('id'))

const tasks = new Hono()

tasks.get('/', (ctx) => ctx.json({
  data: resources.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    href: `/tasks/${task.id}`,
  }))
}))

tasks.get('/:id', (ctx) => ctx.json({ data: findTask(ctx) }))

tasks.post('/:id', async function (ctx) {
  const task = findTask(ctx)
  const args = await ctx.req.parseBody()

  const response = await fetch(task.href, {
    method: task.method || 'POST',
    body: JSON.stringify(args)
  })

  return negotiate(ctx, {
    html: () => ctx.html('ok'),
    json: () => ctx.json({
    })
  })
})

export {
  tasks,
}
