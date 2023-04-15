import { createYoga, createSchema } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const typeDefs = /* GraphQL */ `
  type Query {
    tasks: [Task!]!
  }

  type Task {
    id: Int,
    title: String,
    deadLine: Int,
    startTime: Int,
    endTime: Int,
    remind: Int,
    repeat: Int,
    status: Int
  }

  input CreateTaskInput {
    title: String,
    deadLine: date!,
    startTime: date!,
    endTime: date!,
    remind: Int,
    repeat: Int,
    status: Int!
  }

  input UpdateTaskInput {
    id: Int!,
    status: Int!
  }

  input DeleteTaskInput {
    id: Int!
  }

  type Mutation {
    createTask(input: CreateTaskInput): Task
    updateTask(input: UpdateTaskInput): Task
    deleteTask(input: DeleteTaskInput): Task
  }
`

const resolvers = {
  Query: {
    tasks: () => prisma.task.findMany()
  },
  
  Mutation: {
    async createTask(_,{input}) {
      
      console.log('New Task added === ' +JSON.stringify(input))
      return await prisma.task.create({data: input})
      
    },

    async updateTask(_,{input}) {
       
      console.log('Task updated sucefully ==== '+JSON.stringify(input))
      return await prisma.task.update({
        where:{id: input.id},
        data: {status: input.status}
      })  
    },

    async deleteTask(_, {input}){
      
      console.log('Task deleted sucefully')
      return await prisma.task.delete({
        where:{id: input.id}
      }) 
    }
  },
}

const schema = createSchema({
  typeDefs,
  resolvers,
})

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/task',
})

