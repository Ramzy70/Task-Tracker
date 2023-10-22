import React from 'react'
import Header from "./Header"
import {useState , useEffect} from 'react'
import Tasks from "./Tasks"
import AddTask from "./AddTask"
import Footer from "./Footer"

export default function Home() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        
        const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
        }
        
        getTasks()

    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        
        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        
        return data
    }

    const addTask = async (task) => {
        
        const res = await fetch('http://localhost:5000/tasks' , {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])

        
        // const id = Math.floor(Math.random() *1000 + 1)
        // const newTask = { id , ...task}
        // setTasks([...tasks, newTask])
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}` , {
        method:'DELETE',
        })

        setTasks(tasks.filter((task) => task.id !==id ))
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const upTask = { ...taskToToggle, reminder:!taskToToggle.reminder }
        const res = await fetch(`http://localhost:5000/tasks/${id}` , {
        method:'PUT',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(upTask)
        })

        const data = await res.json()

        setTasks(tasks.map((task) => 
        task.id === id ? {...task,reminder:data.reminder} : task,
        ))
    }
  return (
    <div className="container">
        <Header onAdd = {() => setShowAddTask(!showAddTask) } showAdd = {showAddTask} />
        {showAddTask && <AddTask onAdd={addTask}/> }
        {tasks?.length > 0 ? ( <Tasks onToggle={toggleReminder} tasks={tasks} onDelete={deleteTask} />) : "No tasks at the moment" }
        <Footer/>
    </div>
  )
}
