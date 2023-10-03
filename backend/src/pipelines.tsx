import { Hono } from 'hono'
import { negotiate } from './utils'

const data = [
  {
    id: 'hello-world',
    description: 'Hello World pipeline, basic demo of params and args.',
    params: [
      {
        name: 'name',
        type: 'string',
      },
    ],
    tasks: [
      {
        "hello-world": {
          args: [
            {
              name: 'name',
              from: 'name',
            },
          ],
        },
      },
    ],
  },
]

const pipelines = new Hono()

pipelines.get('/', (ctx) => ctx.json({
  data: data.map((pipeline) => ({
    id: pipeline.id,
    href: `/pipelines/${pipeline.id}`,
    description: pipeline.description,
  })),
}))

pipelines.get('/:id', function (ctx) {
  const id = ctx.req.param('id')

  return ctx.json({
    data: data.find((pipeline) => pipeline.id == id),
  })
})

export {
  pipelines,
}
