import styles from './Task.module.css';
import {useState} from 'react'; 
import useSWR from "swr";

export default function Task (props){
    
    console.log(props.bcolor)

    function handleOnClick(){
        const fetcher = (query: `mutation {
            
        }`) =>
  fetch('/api/task', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data)



  fetcher('Query')
}
    
    
    return (<div className={styles.taskContainer}>
  
    <button className='item' onClick={handleOnClick}/>
    <style jsx>{`.item {
        border: 2px solid ${props.bcolor};
        width: 20px;
        height: 20px;
        margin-right: 10px;
        }`}</style>
    <p>{props.task.title}</p>
   </div>)
}