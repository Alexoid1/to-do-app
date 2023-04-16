import styles from './Task.module.css';
import {useState} from 'react'; 


export default function Task ({task, bcolor, updateTask, deletedTask}){
  
   
    let col = ''
    
    const [status, setStatus] = useState(task.status)
    let newStatus= 0
    function checkStatus(){
      console.log('newStatus', newStatus)
      if(status ===1){
        col = bcolor
        newStatus=0
      }else{
        col = 'none'
        newStatus=1
      }

    }
    checkStatus()
    function handleOnClick(id: number){
 
      fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ "query":`mutation {
        updateTask(input:{
          id: ${id}
          status: ${newStatus}
        }) {
          id
          title
          deadLine
          startTime
          endTime
          remind
          repeat
          status
        }
      }` }),
  })
    .then((res) => res.json())
    .then((json) =>{
      updateTask(id, json.data.updateTask.status )
      if(json.data.updateTask.status === 1){
     
        col = bcolor
        setStatus(1)

      }else{
        col= 'none'
        setStatus(0)
    
      }
      
    })
  }

  function handleDelete(id){
    fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ "query":`mutation {
        deleteTask(input:{
          id: ${id}
        }) {
          id
          title
        }
      }` }),
  })
    .then((res) => res.json())
    .then((json) =>{
      deletedTask(id)
     
      
    })
  }



  

    
    return (<div className={styles.taskContainer}>
  
    <button className='item' onClick={(e) => handleOnClick(task.id)}/>
    <style jsx>{`.item {
        border: 2px solid ${bcolor};
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background: ${col};
        }`}</style>
    <div className={styles.cdcont}>
    <p>{task.title}</p>
    <p className={styles.delete} onClick={()=>handleDelete(task.id)}>✘</p>
    </div>
   </div>)
}