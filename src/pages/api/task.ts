// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Task = {
  title: string,
  deadLine: number,
  startTim: number,
  endTime: number,
  remind: number,
  repeat: number,
  status: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method !== 'POST'){
    return res.status(405).json({message: 'Not allowed method'})
  }
  const todosData = JSON.parse(req.body);
 

  res.json(todosData)
}*/
import { createYoga, createSchema } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const typeDefs = /* GraphQL */ `
  type Query {
    tasks: [Task!]!
  }

  type Task {
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
    deadLine: Int!,
    startTime: Int!,
    endTime: Int!,
    remind: Int,
    repeat: Int,
    status: Int!
  }

  type Mutation {
    createTask(input: CreateTaskInput): Task
  }
`

const resolvers = {
  Mutation: {
    createTask(_,{input}) {
      console.log(JSON.stringify(input))
      return prisma.task.create({data: input})
      
    },
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

