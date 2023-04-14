import Head from 'next/head';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {useState, useEffect} from 'react'
import styles from '@/styles/Home.module.css';
import { PrismaClient, task, Prisma} from '@prisma/client';
import Nav from '../components/Nav/Nav';
import Task from '../components/Task/Task';
import AddButton from '@/components/AddButton/AddButton';


const prisma = new PrismaClient()
export async function getServerSideProps() {
 const client = new ApolloClient({
  uri: "http://localhost:3000/api/task",
  cache: new InMemoryCache()

 })

  const task = await prisma.task.findMany()
  return {
    props: {
      initialTasks: task
    }, // will be passed to the page component as props
  }
}

async function saveTasks(tasks: Prisma.taskCreateInput){
  
}


export default function Home({initialTasks}) {
  type Task ={
    id: number;
    title: string;
    deadLine: number;
    startTime: number;
    endTime: number;
    remind: number;
    repeat: number;
    status: number
  }
  const [update, setUpdate] = useState(true)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
 


  async function updateTasks (res){
 
    setTasks([...tasks])
  }
    // Actualiza el título del documento usando la API del navegador
    
 

  let numI = 0
  const colorArray:Array<string> = ['#F20707','#F29407','F2E207', '#07A3F2', '#E207F2', '#07F22E']
  function getColor( ){
    if(numI > 6) {
      numI =0
      
    }else {
      numI += 1
    }
    const color = colorArray[numI]
    return color
  }
  

  function updateState(){
    setUpdate(false)
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.description}>
          <h1>
            Board
          </h1>
        </div>
        <Nav/>
        <div className={styles.items}>
        {(tasks.map((task) => <Task key={task.id} task={task} bcolor={getColor()} updatetasks={updateTasks}/>))}
        </div>
        
        <AddButton></AddButton>
        </div>
      </main>
    </>
  )
}
