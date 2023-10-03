import { Hono } from 'hono'
import { negotiate } from './utils'

const data = [
  {
    id: 'hello-world',
    title: 'Hello World',
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

const tasks = new Hono()

tasks.get('/', (ctx) => ctx.json({
  data: data.map((task) => `/tasks/${task.id}`),
}))

tasks.get('/:id', function (ctx) {
  const id = ctx.req.param('id')

  return ctx.json({
    data: data.find((task) => task.id == id),
  })
})

tasks.post('/:id', async function (ctx) {
  const id = ctx.req.param('id')
  const task = data.find((task) => task.id === id)

  const args = await ctx.req.parseBody()

  const url = ctx.req.raw.url
  const re = new RegExp('^(https?)://([^\/]*)')
  const match = url.match(re)
  const baseUrl = `${match[1]}://${match[2]}`

  const response = await fetch(`${baseUrl}/${task.href}`, {
    method: task.method || 'POST',
    body: JSON.stringify(args)
  })

  console.log(await response.json())

  return negotiate(ctx, {
    html: () => ctx.html('ok'),
    json: () => ctx.json({
    })
  })
})

export {
  tasks,
}
