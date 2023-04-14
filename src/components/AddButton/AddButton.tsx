import Link from 'next/link';
import styles from './AddButton.module.css';

export default function AddButton (){
    return (
    <div className={styles.cont}>
        <Link href="/addTask" className={styles.buttonContainer}>
        Add Task
        </Link>
   </div>)
}