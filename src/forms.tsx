import { FC } from 'hono/jsx'

export const PipelineForm: FC = (props: { pipeline: Object }) => {
  const pipeline = props.pipeline

  return (
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@3.8.2/dist/full.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div class="container mx-auto">
          <h1 class="font-bold text-lg">{pipeline.id}</h1>

          <p>{pipeline.description}</p>
          <form method="POST" action={pipeline.href}>
            {pipeline.params.map((param) => {
              const field = param.field || 'input'

              switch (field) {
                case 'input':
                  return (
                    <div class="form-control w-full max-w-xs">
                      <label class="label">
                        <span class="label-text">{param.label || param.name}</span>
                      </label>
                      <input type={param.inputType || 'text'} name={param.name} class="input input-bordered w-full max-w-xs" />
                    </div>
                  )
              }
            })}

            <button type="submit" class="btn btn-primary mt-4">Submit</button>
          </form>
        </div>
      </body>
    </html>
  )
}

export const TaskForm: FC = (props: { task: Object }) => {
  const task = props.task

  return (
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@3.8.2/dist/full.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div class="container mx-auto">
          <h1 class="font-bold text-lg">{task.id}</h1>

          <p>{task.description}</p>

          <form method="POST" action={task.href}>
            {task.params.map((param) => {
              const field = param.field || 'input'

              switch (field) {
                case 'input':
                  return (
                    <div class="form-control w-full max-w-xs">
                      <label class="label">
                        <span class="label-text">{param.label || param.name}</span>
                      </label>
                      <input type={param.inputType || 'text'} name={param.name} class="input input-bordered w-full max-w-xs" />
                    </div>
                  )
              }
            })}

            <button type="submit" class="btn btn-primary mt-4">Submit</button>
          </form>
        </div>
      </body>
    </html>
  )
}
