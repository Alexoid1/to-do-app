// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Todo = {
  task: string,
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
  const todo = await prisma.todo.create({
    data: todosData
  })

  res.json(todo)
}
