const fastify = require('fastify')({ logger: false })

let counter = 0

fastify.get('/', async () => {
  counter++
  console.log(counter)
  return { counter }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
