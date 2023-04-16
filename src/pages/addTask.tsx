import {useState} from 'react';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';


export default function AddTask() {
    const [formData, setFormData] = useState({
        title: '',
        deadline: '',
        startTime: '',
        endTime: '',
        remind: '',
        repeat: ''
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
       function  handleSubmit(event){
        event.preventDefault();
        
        let usedata= {
            title: formData.title,
            deadLine: formData.deadline.toString(),
            startTime: formData.startTime.toString(),
            endTime: formData.endTime.toString(),
            remind: formData.remind,
            repeat: parseInt(formData.repeat as string,10),
            status: 0
        }

        const val = JSON.stringify(usedata).replaceAll('"','')
       
        
        // Do something with the form data, e.g. send it to a server
        const graphqlQuery = {
          "query":`mutation {
          createTask(input: {
            title: "${usedata.title}",
            deadLine: "${usedata.deadLine}",
            startTime: "${usedata.startTime}",
            endTime: "${usedata.endTime}",
            remind: ${usedata.remind},
            repeat: ${usedata.repeat},
            status: ${usedata.status}
          }) {
            title
            deadLine
            startTime
            endTime
            remind
            repeat
            status
          }
        }`}

        const options ={
          "method": 'POST',
          "headers": {
          "content-type": "application/json",
          },
          "body": JSON.stringify(graphqlQuery)
        }
        fetch("/api/task", options)
        .then((res) => console.log(res.json()))
        .catch(function(error){console.log(error)})
     
       
      };
    return (
        <>
         
          <main className={styles.main}>
          <div className={styles.container}>

            <div className={styles.description}>
              <Link href="/">
              <h1>
              《 Add Task
              </h1>
              </Link> 
            </div>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <div className={styles.cont2}>
           
                <label className={styles.field}>
                    Title:
                    <input
                    className={styles.inputField}
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    />
                </label>
                <label className={styles.field}>
                    Deadline:
                    <input
                    className={styles.inputField}
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    />
                </label>
                <div className={styles.fieldCont}>
                  <label className={`${styles["field"]} ${styles.field2}`}>
                      Start Time:
                      <input
                      className={styles.inputField}
                      type="date"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      />
                  </label>
                  <label className={`${styles["field"]} ${styles.field2}`}>
                      End Time:
                      <input
                      className={styles.inputField}
                      type="date"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      />
                  </label>
                </div>
                <label className={styles.field}>
                    Remind:
                    <input
                    className={styles.inputField}
                    type="number"
                    name="remind"
                    value={formData.remind}
                    onChange={handleInputChange}
                    />
                </label>
               
                <label className={styles.field}>
                    Repeat:
                    <select
                    name="repeat"
                    className={styles.inputField}
                    value={formData.repeat}
                    onChange={handleInputChange}
                    >
                    <option value="0">Select an option</option>
                    <option value="1">Daily</option>
                    <option value="7">Weekly</option>
                    <option value="30">Monthly</option>
                    </select>
                </label>
                </div>
                <button className={styles.buttonContainer} type="submit">Submit</button>
              
            </form>
        
            </div>
          </main>
        </>
      )
}



