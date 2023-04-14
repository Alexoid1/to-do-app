import styles from './Nav.module.css';

export default function Nav (){
    return (<div className={styles.navContainer}>
    <ul className={styles.list}>
      <li className={styles.item}>All</li>
      <li className={styles.item}>Completed</li>
      <li className={styles.item}>Uncompleted</li>
    </ul>
   </div>)
}