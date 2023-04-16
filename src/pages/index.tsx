import Head from 'next/head';
import {useState, useEffect} from 'react'
import styles from '@/styles/Home.module.css';
import { PrismaClient, Prisma} from '@prisma/client';
import Nav from '../components/Nav/Nav';
import Task from '../components/Task/Task';
import AddButton from '@/components/AddButton/AddButton';

let alltasks =  []     
const prisma = new PrismaClient()
export async function getServerSideProps() {
  const task = await prisma.task.findMany()
  
  return {
    props: {
      initialTasks: task
    }, // will be passed to the page component as props
  }
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
  
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  alltasks= initialTasks
  const [filter, setFilter] = useState('all')
  const [deleteItem, setDeleteItem] = useState(false)

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    if(filter==='completed'){
      setTasks(()=> alltasks.filter((task)=> task.status === 1))
    }else if(filter==='uncompleted') {
      setTasks(()=> alltasks.filter((task)=> task.status === 0))
    }else{
      setTasks(alltasks)
    }
  }, [filter]);
  console.log(tasks)
    // Actualiza el título del documento usando la API del navegador
  let numI = 0;

  const colorArray:Array<string> = ['#F20707','#F29407','F2E207', '#07A3F2', '#E207F2', '#07F22E'];

  function getColor( ){
    if(numI > 6) {
      numI =0
      
    }else {
      numI += 1
    }
    const color = colorArray[numI]
    return color
  }

  function updateNewTask(id:number, val:number){
    const index = tasks.findIndex((task) => task.id === id);
    let updatedTask =tasks
    updatedTask[index].status = val
    setTasks(updatedTask)
  }
  

  function deleteTask(id){
    const index = tasks.findIndex((task) => task.id === id);
    let deletedTask =tasks
    deletedTask.splice(index,1) 
    setTasks(deletedTask)
    setDeleteItem(!deleteItem)
  }
  

  
  return (
    <>
      <Head>
        <title>Task App</title>
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
        <Nav filterTask ={setFilter}/>
        <div className={styles.items}>
        {(tasks.map((task) => <Task key={task.id} task={task} bcolor={getColor()} updateTask={updateNewTask} deletedTask={deleteTask}/>))}
        </div>
        
        <AddButton></AddButton>
        </div>
      </main>
    </>
  )
}
