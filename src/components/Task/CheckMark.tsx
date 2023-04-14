import styles from './Task.module.css';
import {useState} from 'react';
import useSWR from 'swr'
const fetcher = (query: string) =>
fetch('/api/task', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then((res) => res.json())
  .then((json) => json.data)
export default function CheckMark({id, color}){
    const { data, error, isLoading } = useSWR(`mutation {
        updateTask(input:{
          id: ${id}
          status: ${color}
        }) {
          title
          deadLine
          startTime
          endTime
          remind
          repeat
          status
        }
      }`, fetcher)
}