const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema')
const { context } = require('./context')

const server = new ApolloServer({
  schema: schema,
  context: context,
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
