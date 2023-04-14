import styles from './Task.module.css';
import {useState} from 'react'; 


export default function Task ({task, bcolor, updatetasks}){
  
   
    const [color, setColor] = useState('none')
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
      console.log(id)
 
    
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
      console.log(json)
     
      if(json.data.updateTask.status === 1){
        col = bcolor
        setStatus(1)
      

      }else{
        col= 'none'
        setStatus(0)
    
      }
      updatetasks(JSON.parse(JSON.stringify(json.data.updateTask)))
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
    <p>{task.title}</p>
   </div>)
}