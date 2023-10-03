import { raw } from 'hono/html'
import { FC } from 'hono/jsx'
import { Form, Param } from './types'
import './style.css'

const renderParam = (param: Param) => {
  const field = param.field || 'input'
  let inputType

  switch (field) {
    case 'input':
      if (param.inputType) {
        inputType = param.inputType
      } else if (param.type === 'boolean') {
        inputType = 'checkbox'
      } else {
        inputType = 'text'
      }

      switch (inputType) {
        case 'checkbox':
          return (
            <div class="form-control">
              <label class="label">
                <span class="label-text">{param.label || param.name}</span>
              </label>
              <input type="checkbox" name={param.name} class="checkbox checkbox-bordered" />
            </div>
          )
        case 'text':
          return (
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">{param.label || param.name}</span>
              </label>
              <input type={inputType} name={param.name} class="input input-bordered w-full max-w-xs" />
            </div>
          )
        default:
          throw 'error'
      }
  }
}

export const FormView: FC = (props: { form: Form }) => {
  const form = props.form
  console.log(form)

  return (
    <html>
      <head>
        <title>{form.title}</title>
      </head>
      <body>
        <div class="container mx-auto">
          <h1 class="font-bold text-lg">{form.title}</h1>

          {form.description && <p>{form.description}</p>}

          <form method="POST" action={form.action}>
            {form.params.map(renderParam)}
            <button type="submit" class="btn btn-primary mt-4">Submit</button>
          </form>
        </div>

        <script type="module" src="http://localhost:5173/@vite/client" ></script>
        <script type="module" src="http://localhost:5173/src/index.ts" ></script>
      </body>
    </html>
  )
}
