import styles from './Nav.module.css';

export default function Nav ({filterTask}){

  function handleOnClick (name:string){
      filterTask(name)
  }

    return (<div className={styles.navContainer}>
    <ul className={styles.list}>
      <li className={styles.item} onClick={()=>handleOnClick('all')}>All</li>
      <li className={styles.item} onClick={()=>handleOnClick('completed')}>Completed</li>
      <li className={styles.item} onClick={()=>handleOnClick('uncompleted')}>Uncompleted</li>
    </ul>
   </div>)
}