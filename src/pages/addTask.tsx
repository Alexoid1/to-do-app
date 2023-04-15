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
        
        const usedata= {
            title: formData.title,
            deadLine: formData.deadline,
            startTime: formData.startTime,
            endTime: formData.endTime,
            remind: parseInt(formData.remind as string,10),
            repeat: parseInt(formData.repeat as string,10)
        }
        console.log(usedata)
        
        // Do something with the form data, e.g. send it to a server
        fetch('/api/task', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({'query': `mutation {
              createTask(input:{
                title: ${usedata.title}
                deadLine: ${usedata.deadLine}
                startTime: ${usedata.startTime}
                endTime: ${usedata.endTime}
                remind: ${usedata.remind}
                repeat: ${usedata.repeat}
                status: 0
              }) {
                
                title
                deadLine
                startTime
                endTime
                remind
                repeat
                status
              }
            }`}),
        })
        .then((data) => console.log(data.json()))
       
         
      
          
        
        console.log(formData);
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
           
                        <label>
                    Title:
                    <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Deadline:
                    <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Start Time:
                    <input
                    type="date"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    End Time:
                    <input
                    type="date"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Remind:
                    <input
                    type="number"
                    name="remind"
                    value={formData.remind}
                    onChange={handleInputChange}
                    />
                </label>
               
                <label>
                    Repeat:
                    <select
                    name="repeat"
                    value={formData.repeat}
                    onChange={handleInputChange}
                    >
                    <option value="">Select an option</option>
                    <option value="1">Daily</option>
                    <option value="7">Weekly</option>
                    <option value="30">Monthly</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
              
            </form>
        
            </div>
          </main>
        </>
      )
}



