const aliases = {
  html: 'text/html',
  json: 'application/json',
  text: 'text/plain',
}

const match = (subject, pattern) => {
  return new RegExp('^' + pattern.replace(/\*/g, '.*') + '$').test(subject)
}

export const negotiate = function (ctx, provided) {
  const header = ctx.req.header('Accept') || '*/*'

  const accepts = header
    .split(',')
    .map(function (definition) {
      const [type, ...argDefs] = definition.split(';')

      return Object.assign(
        {
          type,
          q: 1.0,
        },
        Object.fromEntries(
          argDefs.map((argDef) => argDef.split('='))
        )
      )
    })
    .sort((a, b) => a.q - b.q)

  const accepted = Object
    .keys(provided)
    .filter(
      (type) => accepts.find((accept) => match(aliases[type], accept.type))
    )

  return provided[accepted[0]]()
}
